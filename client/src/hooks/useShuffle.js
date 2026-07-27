import { useCallback } from "react";
import { shuffle } from "../utils/shuffle";

function useShuffle() {
  const shuffleArray = useCallback((array) => {
    if (!Array.isArray(array)) {
      return [];
    }

    return shuffle(array);
  }, []);

  return {
    shuffleArray,
  };
}

export default useShuffle;
