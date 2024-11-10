// backend/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

// Import routes
const routes = require("./routes/routes");

// Middlewares
app.use(morgan("dev")); // logging
app.use(express.json()); // to parse JSON request bodies (built-in Express middleware)
app.use(express.urlencoded({ extended: true })); // to parse form data (built-in Express middleware)
app.use(express.static(path.join(__dirname, "public"))); // static files

// Routes
app.use("/api", routes); // Prefix all API routes with /api

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Error handling (if route not found)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
    error: process.env.NODE_ENV === "development" ? error : {},
  });
});

module.exports = app;
