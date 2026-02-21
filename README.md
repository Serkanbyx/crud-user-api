# CRUD User API

A clean, RESTful CRUD API built with **Express** and **SQLite**, following **MVC architecture** (Route → Controller → Service → Model).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** SQLite (via better-sqlite3)
- **Validation:** express-validator
- **Architecture:** MVC (Controller → Service → Model)

## Project Structure

```
├── src/
│   ├── config/
│   │   └── database.js        # SQLite connection & table setup
│   ├── models/
│   │   └── userModel.js       # Data access layer (SQL queries)
│   ├── services/
│   │   └── userService.js     # Business logic & error throwing
│   ├── controllers/
│   │   └── userController.js  # Request/response handling
│   ├── routes/
│   │   └── userRoutes.js      # Route definitions
│   ├── middlewares/
│   │   ├── validate.js        # Input validation rules
│   │   └── errorHandler.js    # Centralized error handler
│   └── app.js                 # Express app configuration
├── server.js                  # Entry point
├── .env                       # Environment variables
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev

# Start in production mode
npm start
```

The server will run at `http://localhost:3000`.

## API Endpoints

| Method   | Endpoint      | Description         | Status Codes     |
| -------- | ------------- | ------------------- | ---------------- |
| `GET`    | `/users`      | Get all users       | 200              |
| `GET`    | `/users/:id`  | Get user by ID      | 200, 404         |
| `POST`   | `/users`      | Create a new user   | 201, 400, 409    |
| `PUT`    | `/users/:id`  | Update a user       | 200, 400, 404, 409 |
| `DELETE` | `/users/:id`  | Delete a user       | 204, 404         |

## Request Body (POST & PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

| Field   | Type    | Required | Rules                              |
| ------- | ------- | -------- | ---------------------------------- |
| `name`  | string  | Yes      | 2-50 characters                    |
| `email` | string  | Yes      | Valid email format, unique          |
| `age`   | integer | No       | Between 1 and 150                  |

## Response Format

**Success:**
```json
{
  "success": true,
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com", "age": 25 }
}
```

**Error:**
```json
{
  "success": false,
  "message": "User not found"
}
```

**Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

---

Created by [Serkanby](https://serkanbayraktar.com/) | [Github](https://github.com/Serkanbyx)
