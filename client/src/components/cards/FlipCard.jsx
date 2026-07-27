import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui";

function FlipCard({ playerName, role, word, hint, useHint, onNext }) {
  const [revealed, setRevealed] = useState(false);

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    setRevealed(false);
    onNext();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        onClick={!revealed ? handleReveal : undefined}
        animate={{
          rotateY: revealed ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative h-112.5 w-[320px] cursor-pointer"
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
        >
          <span className="mb-6 text-7xl">🎭</span>

          <h2 className="text-3xl font-bold text-white">{playerName}</h2>

          <p className="mt-6 text-slate-400">Tap to Reveal</p>
        </div>

        {/* Back */}
        <div
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-indigo-500 bg-slate-900 p-8 shadow-2xl"
        >
          {role === "imposter" ? (
            <>
              <h2 className="text-4xl font-black text-red-500">IMPOSTER 😈</h2>

              {useHint ? (
                <p className="mt-6 text-center text-xl text-white">
                  Hint:
                  <br />
                  <span className="font-bold">{hint}</span>
                </p>
              ) : (
                <p className="mt-6 text-slate-400">No Hint</p>
              )}
            </>
          ) : (
            <>
              <h2 className="text-lg uppercase tracking-widest text-slate-400">
                Secret Word
              </h2>

              <p className="mt-6 text-center text-5xl font-black text-indigo-400">
                {word}
              </p>
            </>
          )}
        </div>
      </motion.div>

      {revealed && <Button onClick={handleNext}>Next Player →</Button>}
    </div>
  );
}

export default FlipCard;
