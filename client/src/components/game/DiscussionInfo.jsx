import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui";
import DirectionPicker from "./DirectionPicker";

import useGame from "../../hooks/useGame";

function DiscussionInfo() {
  const navigate = useNavigate();

  const { game } = useGame();

  useEffect(() => {
    if (!game) {
      navigate("/");
    }
  }, [game, navigate]);

  if (!game) return null;

  function handleRevealResults() {
    navigate("/result");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 rounded-3xl bg-slate-900 p-10 shadow-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-black text-white">Discussion Time</h1>

        <p className="mt-3 text-slate-400">Everyone has revealed their card.</p>
      </div>

      <DirectionPicker starter={game.starter} direction={game.direction} />

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-indigo-400">Game Rules</h2>

        <ul className="space-y-3 text-left text-slate-300">
          <li>• The starting player asks the first question.</li>

          <li>• Continue asking questions in the chosen direction.</li>

          <li>
            • Every player should answer naturally without revealing the secret
            word.
          </li>

          <li>• Try to identify the imposter before they guess the word.</li>

          <li>• When everyone is ready, reveal the results.</li>
        </ul>
      </div>

      <Button fullWidth onClick={handleRevealResults}>
        Reveal Results
      </Button>
    </div>
  );
}

export default DiscussionInfo;
