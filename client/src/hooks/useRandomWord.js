import { useCallback, useState } from "react";
import { getRandomWord } from "../services/api";

function useRandomWord() {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomWord = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getRandomWord(category);

      setWordData(data);

      return data;
    } catch (err) {
      setError(err.message || "Failed to load a random word.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    wordData,
    loading,
    error,
    fetchRandomWord,
  };
}

export default useRandomWord;
