import wordsData from "../data/words.json" with { type: "json" };

/**
 * ----------------------------------------
 * Helpers
 * ----------------------------------------
 */

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

/**
 * ----------------------------------------
 * Get all available categories
 * ----------------------------------------
 */

function getCategories() {
  return Object.keys(wordsData);
}

/**
 * ----------------------------------------
 * Generate a new game
 * ----------------------------------------
 */

function generateGame({
  players,
  category,
  impostersCount,
  useHint,
}) {
  console.log("Received category:", JSON.stringify(category));
  console.log("Available categories:", Object.keys(wordsData));
  // Validate category
  if (!wordsData[category]) {
    throw new Error("Invalid category.");
  }

  // Pick a random word
  const selectedWord = randomItem(wordsData[category]);

  // Shuffle player names
  const shuffledPlayers = shuffle(players);

  // Build players
  const gamePlayers = shuffledPlayers.map((name, index) => ({
    id: index + 1,
    name,
    role: "player",
    word: selectedWord.word,
    hint: selectedWord.hint,
  }));

  // Assign imposters
  for (let i = 0; i < impostersCount; i++) {
    gamePlayers[i].role = "imposter";
    gamePlayers[i].word = null;
  }

  // Shuffle again
  const finalPlayers = shuffle(gamePlayers);

  // Pick starter
  const starter = randomItem(finalPlayers).name;

  // Pick direction
  const direction =
    Math.random() < 0.5
      ? "clockwise"
      : "counterclockwise";

  return {
    category,

    word: selectedWord.word,

    hint: selectedWord.hint,

    useHint,

    starter,

    direction,

    players: finalPlayers,
  };
}

export { getCategories, generateGame };