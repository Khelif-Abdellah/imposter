import app from "./app.js";
import env from "./config/env.js";

/**
 * ----------------------------------------
 * Start HTTP Server
 * ----------------------------------------
 */

const server = app.listen(env.PORT, () => {
  console.log(`
🚀 Imposter Server Started

Environment : ${env.NODE_ENV}
Port        : ${env.PORT}

API: http://localhost:${env.PORT}
Health: http://localhost:${env.PORT}/api/health
`);
});

/**
 * ----------------------------------------
 * Graceful Shutdown
 * ----------------------------------------
 */

function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down server...`);

  server.close(() => {
    console.log("✅ Server stopped successfully.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
