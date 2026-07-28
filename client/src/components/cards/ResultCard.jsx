import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui";
import useGame from "../../hooks/useGame";
import useAudio from "../../hooks/useAudio";

function ResultCard() {
  const navigate = useNavigate();

  const { game, resetGame } = useGame();
  const { playGameEnd } = useAudio();

  useEffect(() => {
    if (!game) {
      navigate("/");
    }
  }, [game, navigate]);
  useEffect(() => {
    const timer = setTimeout(() => {
      playGameEnd();
    }, 400);

    return () => clearTimeout(timer);
  }, [playGameEnd]);

  if (!game) return null;

  const imposters = game.players.filter((player) => player.role === "imposter");

  function handlePlayAgain() {
    resetGame();
    navigate("/settings");
  }

  function handleHome() {
    resetGame();
    navigate("/");
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl bg-slate-900 p-10 shadow-2xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-white">🎉 Game Over</h1>

        <p className="mt-3 text-slate-400">Time to reveal the truth!</p>
      </div>

      {/* Secret Word */}
      <div className="mt-10 rounded-2xl border border-indigo-500 bg-slate-800 p-6 text-center">
        <p className="text-sm uppercase tracking-widest text-indigo-400">
          Secret Word
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">{game.word}</h2>
      </div>

      {/* Hint */}
      {game.useHint && (
        <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
          <p className="text-sm uppercase tracking-widest text-indigo-400">
            Hint
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">{game.hint}</h3>
        </div>
      )}

      {/* Imposters */}
      <div className="mt-6 rounded-2xl border border-red-500 bg-red-500/10 p-6">
        <h2 className="text-center text-2xl font-black text-red-400">
          {imposters.length > 1 ? "Imposters" : "Imposter"}
        </h2>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {imposters.map((player) => (
            <span
              key={player.id}
              className="rounded-full bg-red-600 px-5 py-2 font-semibold text-white"
            >
              😈 {player.name}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button fullWidth onClick={handlePlayAgain}>
          🔄 Play Again
        </Button>

        <Button variant="secondary" fullWidth onClick={handleHome}>
          🏠 Home
        </Button>
      </div>
    </div>
  );
}

export default ResultCard;
