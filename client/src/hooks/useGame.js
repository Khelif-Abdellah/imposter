import { useGameContext } from "../context/GameContext";

function useGame() {
  return useGameContext();
}

export default useGame;
