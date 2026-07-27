function shuffle(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  // Create a copy so the original array isn't modified
  const shuffled = [...array];

  // Fisher-Yates Shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

export { shuffle };
