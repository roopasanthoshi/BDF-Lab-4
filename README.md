# Lab 4: User Registration, Login and JWT Authentication

**Name:** Mandava Roopa Santhoshi  
**Registration Number:** 252U1R6111  
**Section:** AIML-2B-207

## GitHub Repository
https://github.com/roopasanthoshi/BDF-Lab-4

## Live Deployment

https://bdf-lab-4.onrender.com

**Note:** The application provides API endpoints. Opening the base URL `/` may display `Cannot GET /` because no homepage route is defined.

## Objective

To develop a user authentication system using Node.js and Express.js. The application implements user registration, login, password hashing and JSON Web Token (JWT) authentication using SQLite as the database.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- bcrypt – Password hashing
- JSON Web Token (JWT) – Authentication
- Postman – API testing
- Render – Deployment
- GitHub – Version control

## Project Structure

```text
lab-04/
│
├── screenshots/
│   ├── database-users.png
│   ├── jwt-decoding.png
│   ├── login-success.png
│   ├── login-unknown-user.png
│   ├── login-wrong-password.png
│   ├── register-duplicate.png
│   ├── register-missing-fields.png
│   └── register-success.png
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── users.db
```

## Installation and Execution

1. Install Node.js.
2. Clone the repository:

```bash
git clone https://github.com/roopasanthoshi/BDF-Lab-4.git
```

3. Navigate to the project directory:

```bash
cd BDF-Lab-4
```

4. Install dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

6. The server runs on port `3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Registers a new user |
| POST | `/login` | Authenticates an existing user |

### Registration

- Accepts username, name and password.
- Validates the required fields.
- Checks for duplicate users.
- Hashes passwords using bcrypt.
- Stores user details in the SQLite database.

### Login

- Accepts username and password.
- Checks whether the user exists.
- Verifies the password using bcrypt.
- Generates a JSON Web Token (JWT) after successful authentication.

## Authentication and Security

- Passwords are stored as hashed values instead of plain text.
- bcrypt is used for password hashing and verification.
- JWT is used to represent authenticated users.
- Invalid login credentials are rejected.
- Duplicate registrations are prevented.

## Testing and Screenshots

The `screenshots` folder contains evidence of the following tests:

1. Successful user registration.
2. Registration with missing fields.
3. Duplicate user registration.
4. Successful user login.
5. Login with an unknown username.
6. Login with an incorrect password.
7. JWT decoding.
8. SQLite database containing registered users.

All API requests were tested using Postman.

## Deployment

The application is deployed using Render.

**Live URL:** https://bdf-lab-4.onrender.com

**GitHub URL:** https://github.com/roopasanthoshi/BDF-Lab-4

## Conclusion

Successfully developed and deployed a user authentication REST API using Node.js, Express.js and SQLite. Implemented user registration, login, password hashing using bcrypt and JWT-based authentication. Tested successful and failure scenarios using Postman.
