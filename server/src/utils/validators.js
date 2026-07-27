import { PLAYER_LIMITS } from "../constants/validation.js";

function validateGenerateGame(data) {
  const { players, category, impostersCount } = data;

  if (!Array.isArray(players)) {
    return {
      valid: false,
      error: "Players must be an array.",
    };
  }

  if (players.length < PLAYER_LIMITS.MIN_PLAYERS) {
    return {
      valid: false,
      error: `At least ${PLAYER_LIMITS.MIN_PLAYERS} players are required.`,
    };
  }

  if (players.length > PLAYER_LIMITS.MAX_PLAYERS) {
    return {
      valid: false,
      error: `Maximum ${PLAYER_LIMITS.MAX_PLAYERS} players are allowed.`,
    };
  }

  const cleanedPlayers = players.map((player) => player.trim());

  for (const player of cleanedPlayers) {
    if (!player) {
      return {
        valid: false,
        error: "Player names cannot be empty.",
      };
    }

    if (player.length > PLAYER_LIMITS.MAX_NAME_LENGTH) {
      return {
        valid: false,
        error: `Player names cannot exceed ${PLAYER_LIMITS.MAX_NAME_LENGTH} characters.`,
      };
    }
  }

  const uniquePlayers = new Set(
    cleanedPlayers.map((player) => player.toLowerCase())
  );

  if (uniquePlayers.size !== cleanedPlayers.length) {
    return {
      valid: false,
      error: "Player names must be unique.",
    };
  }

  if (!category) {
    return {
      valid: false,
      error: "Category is required.",
    };
  }

  if (
    typeof impostersCount !== "number" ||
    impostersCount < 1 ||
    impostersCount >= players.length
  ) {
    return {
      valid: false,
      error: "Invalid number of imposters.",
    };
  }

  return {
    valid: true,
    data: {
      ...data,
      players: cleanedPlayers,
    },
  };
}

export { validateGenerateGame };
