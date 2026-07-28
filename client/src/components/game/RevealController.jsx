import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FlipCard from "../cards/FlipCard";
import ProgressBar from "./ProgressBar";

import useGame from "../../hooks/useGame";

function RevealController() {
  const navigate = useNavigate();

  const { game, currentPlayerIndex, setCurrentPlayerIndex } = useGame();

  useEffect(() => {
    if (!game) {
      navigate("/");
    }
  }, [game, navigate]);

  if (!game) return null;

  const currentPlayer = game.players[currentPlayerIndex];

  function handleNext() {
    const isLastPlayer = currentPlayerIndex === game.players.length - 1;

    if (isLastPlayer) {
      navigate("/discussion");
      return;
    }

    setCurrentPlayerIndex((prev) => prev + 1);
  }

  return (
    <div className="w-full max-w-lg">
      <ProgressBar
        current={currentPlayerIndex + 1}
        total={game.players.length}
      />

      <FlipCard
        key={currentPlayer.id ?? currentPlayerIndex}
        playerName={currentPlayer.name}
        role={currentPlayer.role}
        word={currentPlayer.word}
        hint={currentPlayer.hint}
        useHint={game.useHint}
        onNext={handleNext}
      />
    </div>
  );
}

export default RevealController;
