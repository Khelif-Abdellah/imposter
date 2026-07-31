import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    }, 500);

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
    <>
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      {/* Main Card */}
      <div
        className="
          relative mx-auto w-full max-w-3xl rounded-3xl  border border-white/10 bg-white/5 p-6  shadow-2xl backdrop-blur-xl sm:p-10"
      >
        {/* Header */}
        <div className="text-center">
          <div className="mb-4 text-7xl">🎭</div>
          <h1 className="  bg-linear-to-r  from-white via-indigo-200to-white  bg-clip-text   text-5xl  font-black  text-transparent  sm:text-6xl">
            Game Over
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            The truth has finally been revealed...
          </p>
        </div>

        {/* Secret Word */}
        <div className="mt-10 rounded-3xl border border-indigo-400/40 bg-indigo-500/10 p-8 text-center shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em]  text-indigo-300  ">
            Secret Word
          </p>

          <motion.div
            initial={{
              rotateX: 90,
              opacity: 0,
            }}
            animate={{
              rotateX: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="
    mt-4
    flex
    flex-col
    items-center
    gap-3
  "
          >
            {/* English */}
            <h2
              className="
      max-w-full
      wrap-break-word
      text-3xl
      font-black
      text-white
      sm:text-5xl
    "
            >
              {game.word.en}
            </h2>

            {/* Arabic */}
            <p
              dir="rtl"
              className="
      text-2xl
      font-bold
      text-indigo-200
      sm:text-3xl
    "
            >
              {game.word.ar}
            </p>
          </motion.div>
        </div>

        {/* Hint */}
        {game.useHint && (
          <div
            className="
      mt-6
      rounded-3xl
      border
      border-amber-400/20
      bg-amber-400/5
      p-6
      text-center
      shadow-lg
    "
          >
            {/* Header */}
            <div className="flex items-center justify-center gap-2">
              <div
                className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-amber-400/10
          text-xl
        "
              >
                💡
              </div>

              <p
                className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-amber-300
        "
              >
                Hint
              </p>
            </div>

            {/* English Hint */}
            <p
              className="
        mx-auto
        mt-5
        max-w-xl
        text-xl
        font-bold
        leading-relaxed
        text-white
      "
            >
              {game.hint.en}
            </p>

            {/* Arabic Hint */}
            <p
              dir="rtl"
              className="
        mx-auto
        mt-3
        max-w-xl
        text-lg
        leading-relaxed
        text-amber-100/70
      "
            >
              {game.hint.ar}
            </p>
          </div>
        )}

        {/* Imposters */}
        <div
          className="
          mt-8
          rounded-3xl
          border
          border-red-500/40
          bg-red-500/10
          p-6
          "
        >
          <h2
            className="
          text-center
          text-3xl
          font-black
          text-red-400
          "
          >
            😈 {imposters.length > 1 ? "Imposters" : "Imposter"}
          </h2>

          <div
            className="
          mt-6
          grid
          gap-4
          sm:grid-cols-2
          "
          >
            {imposters.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 1.2 + index * 0.15,
                }}
                className="
                flex
                items-center
                gap-4
                rounded-2xl
                bg-red-600/20
                p-4
                "
              >
                <div
                  className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-2xl
                "
                >
                  😈
                </div>

                <div className="flex items-center gap-2">
                  <p className="font-bold text-white">{player.name}</p>

                  <p className="text-sm text-red-200">The Imposter</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Buttons */}

        <div
          className="
          mt-10
          flex
          flex-col
          gap-4
          sm:flex-row
          "
        >
          <div className="flex-1">
            <Button fullWidth onClick={handlePlayAgain}>
              🔄 Play Again
            </Button>
          </div>

          <div className="flex-1">
            <Button variant="secondary" fullWidth onClick={handleHome}>
              🏠 Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultCard;
