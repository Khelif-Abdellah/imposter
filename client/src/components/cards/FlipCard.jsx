import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui";
import useAudio from "../../hooks/useAudio";

function FlipCard({ playerName, role, word, hint, useHint, onNext }) {
  const [revealed, setRevealed] = useState(false);
  const { playFlip } = useAudio();

  function handleReveal() {
    playFlip();
    setRevealed(true);
  }
  function handleNext() {
    setRevealed(false);

    setTimeout(() => {
      onNext();
    }, 600); // Match your flip duration
  }
  return (
    <div
      className="flex flex-col items-center gap-8"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        onClick={!revealed ? handleReveal : undefined}
        animate={{
          rotateY: revealed ? 180 : 0,
          y: revealed ? 0 : [0, -6, 0],
        }}
        transition={{
          rotateY: {
            type: "spring",
            stiffness: 120,
            damping: 16,
          },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.03,
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative h-140 w-[92vw] max-w-90 cursor-pointer"
      >
        {/* FRONT */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)",
            WebkitTransform: "translateZ(1px)",
          }}
          className="
          absolute inset-0
          overflow-hidden
          rounded-4xl
          border border-white/10
          bg-linear-to-br
          from-slate-900
          via-slate-900
          to-slate-800
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
        "
        >
          {/* Glow */}
          <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[90px]" />

          {/* Border */}
          <div className="absolute inset-0 rounded-4xl ring-1 ring-indigo-500/20" />

          <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 4, 0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                border
                border-indigo-400/20
                bg-indigo-500/10
                text-7xl
                shadow-lg
                shadow-indigo-500/20
              "
            >
              🎭
            </motion.div>

            <p className="mt-10 text-xs uppercase tracking-[0.45em] text-indigo-300">
              Player
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-wide text-white">
              {playerName}
            </h2>

            <motion.div
              animate={{
                scale: [1, 0.97, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="
                mt-12
                rounded-full
                border
                border-indigo-500/20
                bg-indigo-500/10
                px-8
                py-3
              "
            >
              <p className="font-semibold text-indigo-200">
                👆 Tap to reveal your role
              </p>
            </motion.div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            transform: "rotateY(180deg) translateZ(1px)",
            WebkitTransform: "rotateY(180deg) translateZ(1px)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          className="
          absolute inset-0
          overflow-hidden
          rounded-4xl
          border border-white/10
          bg-linear-to-br
          from-slate-900
          via-slate-900
          to-slate-800
          shadow-[0_30px_80px_rgba(0,0,0,.45)]
        "
        >
          {role === "imposter" ? (
            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="absolute top-0 h-64 w-64 rounded-full bg-red-500/20 blur-[90px]" />

              <div className="text-8xl">💀</div>

              <h2 className="mt-6 text-5xl font-black tracking-widest text-red-500">
                IMPOSTER
              </h2>

              {useHint ? (
                <div className="mt-10 w-full rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-red-300">
                    Hint
                  </p>

                  <p className="mt-4 text-3xl font-black text-white">{hint}</p>
                </div>
              ) : (
                <p className="mt-10 text-slate-400">No hint available</p>
              )}

              <p className="mt-8 text-slate-400">
                Blend in. Stay calm. Don't get caught.
              </p>
            </div>
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
              <div className="absolute top-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-[90px]" />

              <div className="text-8xl">🔐</div>

              <p className="mt-6 text-xs uppercase tracking-[0.45em] text-cyan-300">
                Secret Word
              </p>

              <div className="mt-10 rounded-3xl border border-cyan-500/30 bg-cyan-500/10 px-10 py-8">
                <h2 className="text-5xl font-black tracking-wide text-white">
                  {word}
                </h2>
              </div>

              <p className="mt-8 text-slate-400">
                Memorize it and keep it secret.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
          >
            <Button
              onClick={handleNext}
              className="min-w-60 py-4 text-lg font-bold"
            >
              Next Player →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FlipCard;
