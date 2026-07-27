import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * ----------------------------------------
 * Environment Configuration
 * ----------------------------------------
 */

const env = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

// Validate required environment variables
const requiredVariables = ["PORT", "CLIENT_URL"];

for (const variable of requiredVariables) {
  if (!env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

export default env;
