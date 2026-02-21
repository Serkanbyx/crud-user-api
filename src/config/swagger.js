const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD User API",
      version: "1.0.0",
      description:
        "A clean RESTful CRUD API for user management, built with Express and SQLite following MVC architecture.",
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "John Doe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            age: { type: "integer", nullable: true, example: 25 },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2026-02-21 12:00:00",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              example: "2026-02-21 12:00:00",
            },
          },
        },
        UserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 50,
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            age: {
              type: "integer",
              minimum: 1,
              maximum: 150,
              nullable: true,
              example: 25,
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/User" },
          },
        },
        ListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            count: { type: "integer", example: 2 },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/User" },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "User not found" },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Validation failed" },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string", example: "email" },
                  message: {
                    type: "string",
                    example: "Please provide a valid email address",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
