function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }

  const index = randomNumber(0, array.length - 1);

  return array[index];
}

function randomBoolean() {
  return Math.random() >= 0.5;
}

function randomDirection() {
  return randomBoolean() ? "clockwise" : "counterclockwise";
}

export { randomNumber, randomItem, randomBoolean, randomDirection };
