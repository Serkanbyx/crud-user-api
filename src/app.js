const express = require("express");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CRUD User API",
    version: "1.0.0",
    endpoints: {
      users: "/users",
    },
  });
});

app.use("/users", userRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
