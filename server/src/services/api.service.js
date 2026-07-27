import axios from "axios";

/**
 * ----------------------------------------
 * Axios Instance
 * ----------------------------------------
 */

const api = axios.create({
  baseURL: "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * ----------------------------------------
 * Game API
 * ----------------------------------------
 */

/**
 * Get all available categories.
 */
async function getCategories() {
  const response = await api.get("/game/categories");

  return response.data.data;
}

/**
 * Generate a new game.
 */
async function generateGame(gameData) {
  const response = await api.post("/game/generate", gameData);

  return response.data.data;
}

export { getCategories, generateGame };
