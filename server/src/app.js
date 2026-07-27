import express from "express";
import cors from "cors";

import env from "./config/env.js";
import gameRoutes from "./routes/game.routes.js";

const app = express();

/**
 * ----------------------------------------
 * Global Middlewares
 * ----------------------------------------
 */

// Enable CORS
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

/**
 * ----------------------------------------
 * Health Check
 * ----------------------------------------
 */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

/**
 * ----------------------------------------
 * Routes
 * ----------------------------------------
 */

app.use("/api/game", gameRoutes);

/**
 * ----------------------------------------
 * 404 Handler
 * ----------------------------------------
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

export default app;
