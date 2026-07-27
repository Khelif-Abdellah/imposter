function validateSettings(settings) {
  const { playersCount, impostersCount, category } = settings;

  if (!playersCount) {
    return {
      valid: false,
      error: "Please select the number of players.",
    };
  }

  if (playersCount < 3) {
    return {
      valid: false,
      error: "At least 3 players are required.",
    };
  }

  if (playersCount > 20) {
    return {
      valid: false,
      error: "Maximum 20 players are allowed.",
    };
  }

  if (!impostersCount) {
    return {
      valid: false,
      error: "Please select the number of imposters.",
    };
  }

  if (impostersCount >= playersCount) {
    return {
      valid: false,
      error: "Imposters must be fewer than players.",
    };
  }

  if (!category) {
    return {
      valid: false,
      error: "Please choose a category.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

function validatePlayers(players) {
  if (!Array.isArray(players)) {
    return {
      valid: false,
      error: "Players must be an array.",
    };
  }

  if (players.length < 3) {
    return {
      valid: false,
      error: "At least 3 players are required.",
    };
  }

  // Remove leading/trailing spaces
  const trimmedPlayers = players.map((player) => player.trim());

  // Check empty names
  for (const player of trimmedPlayers) {
    if (!player) {
      return {
        valid: false,
        error: "Player names cannot be empty.",
      };
    }
  }

  // Check duplicate names (case-insensitive)
  const normalizedPlayers = trimmedPlayers.map((player) =>
    player.toLowerCase()
  );

  const uniquePlayers = new Set(normalizedPlayers);

  if (uniquePlayers.size !== normalizedPlayers.length) {
    return {
      valid: false,
      error: "Player names must be unique.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export { validateSettings, validatePlayers };
