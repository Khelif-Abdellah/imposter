import { createContext, useContext, useMemo, useState } from "react";

const GameContext = createContext(null);

function GameProvider({ children }) {
  // ----------------------------
  // Settings
  // ----------------------------
  const [settings, setSettings] = useState({
    playersCount: 4,
    impostersCount: 1,
    category: "",
    useHint: true,
  });

  // ----------------------------
  // Players
  // ----------------------------
  const [players, setPlayers] = useState([]);

  // ----------------------------
  // Generated Game
  // ----------------------------
  const [game, setGame] = useState(null);

  // ----------------------------
  // Reveal Progress
  // ----------------------------
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // ----------------------------
  // Game Status
  // ----------------------------
  const [gameStarted, setGameStarted] = useState(false);

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
  }

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
