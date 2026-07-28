import { createContext, useContext, useEffect, useMemo, useState } from "react";

const GameContext = createContext(null);

function GameProvider({ children }) {
  // ----------------------------
  // Settings
  // ----------------------------
  const savedState = JSON.parse(localStorage.getItem("imposter-game")) || {};

  const [settings, setSettings] = useState(
    savedState.settings || {
      playersCount: 4,
      impostersCount: 1,
      category: "",
      useHint: true,
    }
  );

  const [players, setPlayers] = useState(savedState.players || []);

  const [game, setGame] = useState(savedState.game || null);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(
    savedState.currentPlayerIndex || 0
  );

  const [gameStarted, setGameStarted] = useState(
    savedState.gameStarted || false
  );

  // ----------------------------
  // Reset Game
  // ----------------------------
  function resetGame() {
    setPlayers([]);
    setGame(null);
    setCurrentPlayerIndex(0);
    setGameStarted(false);

    setSettings({
      playersCount: 4,
      impostersCount: 1,
      category: "",
      useHint: true,
    });

    localStorage.removeItem("imposter-game");
  }

  useEffect(() => {
    localStorage.setItem(
      "imposter-game",
      JSON.stringify({
        settings,
        players,
        game,
        currentPlayerIndex,
        gameStarted,
      })
    );
  }, [settings, players, game, currentPlayerIndex, gameStarted]);

  const value = useMemo(
    () => ({
      settings,
      setSettings,

      players,
      setPlayers,

      game,
      setGame,

      currentPlayerIndex,
      setCurrentPlayerIndex,

      gameStarted,
      setGameStarted,

      resetGame,
    }),
    [settings, players, game, currentPlayerIndex, gameStarted]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used inside GameProvider.");
  }

  return context;
}

export { GameProvider, useGameContext };
