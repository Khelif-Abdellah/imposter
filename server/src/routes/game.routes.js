import { Router } from "express";

import {
  getGameCategories,
  createGame,
} from "../controllers/game.controller.js";

const router = Router();

/**
 * ----------------------------------------
 * Game Routes
 * ----------------------------------------
 */

// GET /api/game/categories
router.get("/categories", getGameCategories);

// POST /api/game/generate
router.post("/generate", createGame);

export default router;
