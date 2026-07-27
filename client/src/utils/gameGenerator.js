import { randomItem, randomDirection } from "./random";
import { shuffle } from "./shuffle";

/**
 * ----------------------------------------
 * Generate a complete Imposter game
 * ----------------------------------------
 *
 * Returns:
 * {
 *   category,
 *   word,
 *   hint,
 *   direction,
 *   starter,
 *   useHint,
 *   players
 * }
 */

function generateGame(settings, players, words) {
  // Safety checks
  if (!players?.length) {
    throw new Error("Cannot generate a game without players.");
  }

  if (!words?.length) {
    throw new Error("No words available.");
  }

  // Pick a random word
  const selectedWord = randomItem(words);

  // Shuffle players before assigning roles
  const shuffledPlayers = shuffle(players);

  // Build player objects
  const gamePlayers = shuffledPlayers.map((name, index) => ({
    id: index + 1,
    name,
    role: "player",
    word: selectedWord.word,
    hint: selectedWord.hint,
  }));

  // Assign imposters
  for (let i = 0; i < settings.impostersCount; i++) {
    gamePlayers[i].role = "imposter";
    gamePlayers[i].word = null;
  }

  // Shuffle again so imposters aren't always first
  const finalPlayers = shuffle(gamePlayers);

  // Pick who starts the discussion
  const starter = randomItem(finalPlayers).name;

  return {
    category: settings.category,

    word: selectedWord.word,

    hint: selectedWord.hint,

    useHint: settings.useHint,

    direction: randomDirection(),

    starter,

    players: finalPlayers,
  };
}

export { generateGame };
