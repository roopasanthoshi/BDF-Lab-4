
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'my_secret_key';

const dbPath = path.join(__dirname, 'users.db');

let db = null;

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                name TEXT,
                password TEXT
            );
        `);

        console.log('Database connected successfully');
        console.log('Users table created successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
};

// User Registration
app.post('/register', async (req, res) => {
    try {
        const { username, name, password } = req.body;

        if (!username || !name || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await db.get(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.run(
            `INSERT INTO users (username, name, password)
             VALUES (?, ?, ?)`,
            [username, name, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to register user'
        });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const user = await db.get(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (!user) {
            return res.status(400).json({
                message: 'Invalid user'
            });
        }

        const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        const payload = {
            username: username
        };

        const jwtToken = jwt.sign(payload, JWT_SECRET);

        res.status(200).json({
            jwt_token: jwtToken
        });

    } catch (error) {
        res.status(500).json({
            message: 'Unable to login'
        });
    }
});

// Start server
initializeDBAndServer();
