import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const STORAGE_KEY = "imposter-game";

const DEFAULT_SETTINGS = {
  playersCount: 4,
  impostersCount: 1,
  categories: [],
  useHint: true,
};

const DEFAULT_STATE = {
  settings: DEFAULT_SETTINGS,
  players: [],
  game: null,
  currentPlayerIndex: 0,
  gameStarted: false,
};

const GameContext = createContext(null);

function loadState() {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_STATE;

    return {
      ...DEFAULT_STATE,
      ...JSON.parse(saved),
    };
  } catch (error) {
    console.error("Failed to load game:", error);
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_STATE;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        ...state,
        settings:
          typeof action.payload === "function"
            ? action.payload(state.settings)
            : action.payload,
      };

    case "SET_PLAYERS":
      return {
        ...state,
        players:
          typeof action.payload === "function"
            ? action.payload(state.players)
            : action.payload,
      };

    case "SET_GAME":
      return {
        ...state,
        game:
          typeof action.payload === "function"
            ? action.payload(state.game)
            : action.payload,
      };

    case "SET_CURRENT_PLAYER":
      return {
        ...state,
        currentPlayerIndex:
          typeof action.payload === "function"
            ? action.payload(state.currentPlayerIndex)
            : action.payload,
      };

    case "SET_GAME_STARTED":
      return {
        ...state,
        gameStarted:
          typeof action.payload === "function"
            ? action.payload(state.gameStarted)
            : action.payload,
      };

    case "RESET":
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE, loadState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save game:", error);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [state]);

  const setSettings = useCallback((payload) => {
    dispatch({
      type: "SET_SETTINGS",
      payload,
    });
  }, []);

  const setPlayers = useCallback((payload) => {
    dispatch({
      type: "SET_PLAYERS",
      payload,
    });
  }, []);

  const setGame = useCallback((payload) => {
    dispatch({
      type: "SET_GAME",
      payload,
    });
  }, []);

  const setCurrentPlayerIndex = useCallback((payload) => {
    dispatch({
      type: "SET_CURRENT_PLAYER",
      payload,
    });
  }, []);

  const setGameStarted = useCallback((payload) => {
    dispatch({
      type: "SET_GAME_STARTED",
      payload,
    });
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "RESET" });
  }, []);

  const value = useMemo(
    () => ({
      settings: state.settings,
      players: state.players,
      game: state.game,
      currentPlayerIndex: state.currentPlayerIndex,
      gameStarted: state.gameStarted,

      setSettings,
      setPlayers,
      setGame,
      setCurrentPlayerIndex,
      setGameStarted,

      resetGame,
    }),
    [
      state,
      setSettings,
      setPlayers,
      setGame,
      setCurrentPlayerIndex,
      setGameStarted,
      resetGame,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used inside GameProvider.");
  }

  return context;
}
