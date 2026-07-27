import { getCategories, generateGame } from "../services/game.service.js";

import { successResponse, errorResponse } from "../utils/response.js";

import { validateGenerateGame } from "../utils/validators.js";

/**
 * ----------------------------------------
 * GET /api/game/categories
 * ----------------------------------------
 */

function getGameCategories(req, res) {
  try {
    const categories = getCategories();

    return successResponse(
      res,
      categories,
      "Categories retrieved successfully."
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

/**
 * ----------------------------------------
 * POST /api/game/generate
 * ----------------------------------------
 */

function createGame(req, res, next) {
  try {
    const validation = validateGenerateGame(req.body);

    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
    }

    const game = generateGame(validation.data);

    return successResponse(res, game, "Game generated successfully.", 201);
  } catch (error) {
    next(error);
  }
}

export { getGameCategories, createGame };
