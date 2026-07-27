const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data.data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}

/*
|--------------------------------------------------------------------------
| Game API
|--------------------------------------------------------------------------
*/

export function getCategories() {
  return request("/game/categories");
}

export function generateGame(payload) {
  return request("/game/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function checkServer() {
  return request("/health");
}
