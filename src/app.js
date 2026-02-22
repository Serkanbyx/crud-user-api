const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const { version } = require("../package.json");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD User API</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: #0b1120;
      color: #e2e8f0;
      overflow: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 60%);
      z-index: 0;
    }

    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(56, 189, 248, 0.03) 59px, rgba(56, 189, 248, 0.03) 60px),
        repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(56, 189, 248, 0.03) 59px, rgba(56, 189, 248, 0.03) 60px);
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 3rem 2rem;
      max-width: 520px;
      width: 90%;
    }

    .icon-group {
      display: flex;
      justify-content: center;
      gap: 0.6rem;
      margin-bottom: 2rem;
    }

    .user-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      position: relative;
      opacity: 0.5;
      transition: opacity 0.4s, transform 0.4s;
    }

    .user-icon::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: currentColor;
    }

    .user-icon::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 14px;
      border-radius: 50% 50% 0 0;
      background: currentColor;
    }

    .user-icon:nth-child(1) { color: #38bdf8; }
    .user-icon:nth-child(2) { color: #8b5cf6; opacity: 0.8; transform: scale(1.15); }
    .user-icon:nth-child(3) { color: #14b8a6; }

    .container:hover .user-icon { opacity: 0.9; }
    .container:hover .user-icon:nth-child(2) { opacity: 1; transform: scale(1.25); }

    h1 {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #38bdf8 0%, #8b5cf6 50%, #14b8a6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.4rem;
      line-height: 1.2;
    }

    .version {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 2.5rem;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 3rem;
    }

    .btn-primary, .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.85rem 1.5rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      letter-spacing: 0.01em;
    }

    .btn-primary {
      background: linear-gradient(135deg, #38bdf8, #8b5cf6);
      color: #fff;
      box-shadow: 0 4px 20px rgba(56, 189, 248, 0.25);
    }

    .btn-primary:hover {
      box-shadow: 0 8px 30px rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: rgba(56, 189, 248, 0.08);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    .btn-secondary:hover {
      background: rgba(56, 189, 248, 0.15);
      border-color: rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }

    .sign {
      font-size: 0.8rem;
      color: #475569;
      letter-spacing: 0.02em;
    }

    .sign a {
      color: #64748b;
      text-decoration: none;
      transition: color 0.3s;
    }

    .sign a:hover { color: #38bdf8; }

    @media (max-width: 480px) {
      h1 { font-size: 1.8rem; }
      .container { padding: 2rem 1.2rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-group">
      <div class="user-icon"></div>
      <div class="user-icon"></div>
      <div class="user-icon"></div>
    </div>

    <h1>CRUD User API</h1>
    <p class="version">v${version}</p>

    <div class="links">
      <a href="/api-docs" class="btn-primary">API Documentation</a>
      <a href="/users" class="btn-secondary">Users Endpoint</a>
    </div>

    <footer class="sign">
      Created by
      <a href="https://serkanbayraktar.com/" target="_blank" rel="noopener noreferrer">Serkanby</a>
      |
      <a href="https://github.com/Serkanbyx" target="_blank" rel="noopener noreferrer">Github</a>
    </footer>
  </div>
</body>
</html>`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
