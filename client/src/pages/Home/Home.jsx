import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "../../components/ui";

import FadeIn from "../../components/animations/FadeIn";
import ScaleIn from "../../components/animations/ScaleIn";
import SlideUp from "../../components/animations/SlideUp";

import useAudio from "../../hooks/useAudio";

function Home() {
  const navigate = useNavigate();

  const { playBackground, resetBackground } = useAudio();

  useEffect(() => {
    resetBackground();
  }, []);

  function handlePlay() {
    playBackground();
    navigate("/settings");
  }

  return (
    <section className="relative flex min-h-[calc(100vh-128px)] items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
      {/* Huge background text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          select-none
          text-[24vw]
          font-black
          tracking-[0.25em]
          text-white
          blur-[2px]
        "
      >
        IMPOSTER
      </motion.h1>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Badge */}
        <FadeIn>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(99,102,241,.2)",
                "0 0 20px rgba(99,102,241,.45)",
                "0 0 0px rgba(99,102,241,.2)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mx-auto inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-300 sm:text-sm">
              🎭 Social Deduction Game
            </span>
          </motion.div>
        </FadeIn>

        {/* Title */}
        <ScaleIn delay={0.2}>
          <motion.h1
            animate={{
              scale: [1, 1.03, 1],
              textShadow: [
                "0 0 15px rgba(99,102,241,.3)",
                "0 0 40px rgba(129,140,248,.9)",
                "0 0 15px rgba(99,102,241,.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              mt-16
              text-5xl
              font-black
              tracking-[0.18em]
              text-white

              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            IMPOSTER
          </motion.h1>
        </ScaleIn>

        {/* Subtitle */}
        <SlideUp delay={0.4}>
          <motion.p
            initial={{
              opacity: 0,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.5,
              duration: 0.7,
            }}
            className="
              mx-auto
              mt-12
              max-w-xl
              text-base
              leading-7
              text-slate-300

              sm:text-lg
              sm:leading-8
            "
          >
            One player hides the truth.
            <br />
            Everyone else knows the secret word.
            <br />
            Bluff. Observe. Discuss. Survive.
          </motion.p>
        </SlideUp>

        {/* Buttons */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <SlideUp delay={0.6}>
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(99,102,241,.25)",
                  "0 0 35px rgba(99,102,241,.7)",
                  "0 0 10px rgba(99,102,241,.25)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="rounded-xl"
            >
              <Button
                onClick={handlePlay}
                className="w-full max-w-xs px-10 py-4 text-lg font-bold sm:text-xl"
              >
                <motion.span
                  animate={{
                    x: [0, 6, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  className="mr-2 inline-block"
                >
                  ▶
                </motion.span>
                Start Game
              </Button>
            </motion.div>
          </SlideUp>

          <SlideUp delay={0.75}>
            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <Button
                variant="secondary"
                className="w-full max-w-xs py-4 text-lg"
                onClick={() => navigate("/how-to-play")}
              >
                📖 How To Play
              </Button>
            </motion.div>
          </SlideUp>
        </div>

        {/* Footer */}
        <FadeIn delay={1}>
          <div className="mt-16 space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Version 1.0
            </p>

            <p className="text-sm text-slate-500">
              Made with ❤️ by Khelif Abdellah
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Home;
