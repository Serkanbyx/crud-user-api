# 🗄️ CRUD User API

A clean, standards-compliant RESTful CRUD API for user management. Built with **Express 5** and **SQLite**, following **MVC architecture** (Route → Controller → Service → Model) with input validation, centralized error handling, and interactive Swagger documentation.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete users through RESTful endpoints
- **MVC Architecture**: Clean separation of concerns with Route → Controller → Service → Model layers
- **Input Validation**: Request body validation using express-validator with detailed error messages
- **Centralized Error Handling**: Consistent error responses with proper HTTP status codes
- **Duplicate Detection**: Email uniqueness enforcement with 409 Conflict response
- **Swagger Documentation**: Interactive API docs with OpenAPI 3.0 spec at `/api-docs`
- **SQLite Database**: Lightweight, zero-configuration database with WAL mode for performance
- **Consistent Response Format**: Standardized JSON responses with `success` flag across all endpoints

## Live Demo

[🔗 View Live API](https://crud-user-api-slmp.onrender.com/)

[📄 Swagger Docs](https://crud-user-api-slmp.onrender.com/api-docs/)

## Technologies

- **Node.js**: JavaScript runtime (>= 18.0.0)
- **Express 5**: Web framework for building RESTful APIs
- **SQLite (better-sqlite3)**: Lightweight embedded SQL database with synchronous API
- **express-validator**: Middleware for request body validation
- **Swagger (swagger-jsdoc + swagger-ui-express)**: Interactive API documentation
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reload

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── database.js          # SQLite connection & table setup
│   │   └── swagger.js           # OpenAPI 3.0 specification
│   ├── models/
│   │   └── userModel.js         # Data access layer (SQL queries)
│   ├── services/
│   │   └── userService.js       # Business logic & error throwing
│   ├── controllers/
│   │   └── userController.js    # Request/response handling
│   ├── routes/
│   │   └── userRoutes.js        # Route definitions with JSDoc
│   ├── middlewares/
│   │   ├── validate.js          # Input validation rules
│   │   └── errorHandler.js      # Centralized error handler
│   └── app.js                   # Express app configuration
├── server.js                    # Entry point
├── .env                         # Environment variables
└── package.json
```

## Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** (comes with Node.js)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Serkanbyx/s3.2_Crude-User-API.git

# Navigate to project directory
cd s3.2_Crude-User-API

# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev

# Or start in production mode
npm start
```

The server will run at `http://localhost:3000` and Swagger docs at `http://localhost:3000/api-docs`.

## Usage

1. Start the server with `npm run dev`
2. Open `http://localhost:3000/api-docs` in your browser for interactive documentation
3. Use Swagger UI's "Try it out" button to test endpoints directly
4. Or use any HTTP client (Postman, curl, etc.) to send requests

## API Endpoints

| Method   | Endpoint      | Description       | Status Codes        |
| -------- | ------------- | ----------------- | ------------------- |
| `GET`    | `/users`      | Get all users     | 200                 |
| `GET`    | `/users/:id`  | Get user by ID    | 200, 404            |
| `POST`   | `/users`      | Create a new user | 201, 400, 409       |
| `PUT`    | `/users/:id`  | Update a user     | 200, 400, 404, 409  |
| `DELETE` | `/users/:id`  | Delete a user     | 204, 404            |

## How It Works?

### Request Body (POST & PUT)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

| Field   | Type    | Required | Rules                     |
| ------- | ------- | -------- | ------------------------- |
| `name`  | string  | Yes      | 2-50 characters           |
| `email` | string  | Yes      | Valid email format, unique |
| `age`   | integer | No       | Between 1 and 150         |

### Response Format

**Success (single resource):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "created_at": "2026-02-21 12:00:00",
    "updated_at": "2026-02-21 12:00:00"
  }
}
```

**Success (list):**

```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

**Validation Error (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

**Not Found (404):**

```json
{
  "success": false,
  "message": "User not found"
}
```

**Conflict (409):**

```json
{
  "success": false,
  "message": "A user with this email already exists"
}
```

### Architecture Flow

```
Client Request
     │
     ▼
  Routes        → Defines endpoints & attaches validation
     │
     ▼
  Middleware     → Validates input (express-validator)
     │
     ▼
  Controller    → Handles req/res, delegates to service
     │
     ▼
  Service       → Business logic, throws AppError on failure
     │
     ▼
  Model         → SQL queries via better-sqlite3
     │
     ▼
  Database      → SQLite (database.db)
```

## Features in Detail

✅ Full CRUD operations (Create, Read, Update, Delete)

✅ Input validation with detailed field-level error messages

✅ Centralized error handling middleware

✅ Duplicate email detection (409 Conflict)

✅ Interactive Swagger UI documentation

✅ SQLite with WAL mode for better read performance

✅ Consistent JSON response format

✅ Render deployment ready (0.0.0.0 binding)

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) for details on the process.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Developer

**Serkanby**

- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- Email: [serkanbyx1@gmail.com](mailto:serkanbyx1@gmail.com)

## Contact

- Have a bug or feature request? [Open an issue](https://github.com/Serkanbyx/s3.2_Crude-User-API/issues)
- Email: serkanbyx1@gmail.com
- Website: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
