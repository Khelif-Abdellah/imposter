import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  const rules = [
    "The starting player asks the first question.",
    `Continue asking questions ${
      game.direction === "clockwise" ? "clockwise" : "counter-clockwise"
    }.`,
    "Answer naturally without revealing the secret word.",
    "Watch everyone's reactions carefully.",
    "Find the imposter before they guess the word.",
  ];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-10 shadow-[0_30px_80px_rgba(0,0,0,.45)]">
        {/* Background Glow */}
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

        <div className="relative text-center">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 4, 0, -4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-7xl shadow-lg shadow-indigo-500/20"
          >
            🗣️
          </motion.div>

          <div className="mt-8 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
            Discussion Phase
          </div>

          <h1 className="mt-6 text-5xl font-black text-white">
            Time to Discuss
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-400">
            Every player now knows their role. Ask clever questions, observe
            carefully, and uncover the imposter before it's too late.
          </p>
        </div>
      </div>

      {/* Direction */}
      <div className="rounded-[28px] border border-white/10 bg-slate-900 p-8 shadow-xl">
        <DirectionPicker starter={game.starter} direction={game.direction} />
      </div>

      {/* Rules */}
      <div className="rounded-[28px] border border-white/10 bg-slate-900 p-8 shadow-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-2xl">
            📋
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Game Rules</h2>

            <p className="text-slate-400">Keep the discussion fair and fun.</p>
          </div>
        </div>

        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              key={rule}
              className="flex items-start gap-5 rounded-2xl border border-slate-700 bg-slate-800/60 p-5 transition hover:border-indigo-500/30 hover:bg-slate-800"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-black text-white">
                {index + 1}
              </div>

              <p className="pt-1 text-slate-300">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-[28px] border border-amber-500/20 bg-amber-500/10 p-7">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>

          <div>
            <h3 className="text-xl font-bold text-amber-300">Pro Tip</h3>

            <p className="mt-2 leading-7 text-amber-100/90">
              Don't ask obvious questions. The best players blend in naturally.
              Pay close attention to hesitation, confidence, and inconsistent
              answers.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <Button
          fullWidth
          onClick={handleRevealResults}
          className="py-5 text-lg font-bold"
        >
          🎉 Reveal Results
        </Button>

        <p className="text-center text-sm text-slate-500">
          Only reveal the results after everyone has finished discussing and
          voted for the suspected imposter.
        </p>
      </div>
    </div>
  );
}

export default DiscussionInfo;
