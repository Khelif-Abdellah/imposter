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

    return data;
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

// Get all available categories
export function getCategories() {
  return request("/categories");
}

// Get random word from category
export function getRandomWord(category) {
  return request(`/categories/${category}/random`);
}

// Health check
export function checkServer() {
  return request("/health");
}
