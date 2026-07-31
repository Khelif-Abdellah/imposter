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
      <h1
        initial={{ opacity: 0 }}
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
          opacity-[0.05]
         
        "
      >
        IMPOSTER
      </h1>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Badge */}
        <FadeIn>
          <div className="mx-auto inline-flex rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-300 sm:text-sm">
              🎭 Social Deduction Game
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <ScaleIn delay={0.2}>
          <h1
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
          </h1>
        </ScaleIn>

        {/* Subtitle */}
        <SlideUp delay={0.4}>
          <p
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
          </p>
        </SlideUp>

        {/* Buttons */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <SlideUp delay={0.6}>
            <div className="rounded-xl">
              <Button
                onClick={handlePlay}
                className="w-full max-w-xs px-10 py-4 text-lg font-bold sm:text-xl"
              >
                <span className="mr-2 inline-block">▶</span>
                Start Game
              </Button>
            </div>
          </SlideUp>

          <SlideUp delay={0.75}>
            <div>
              <Button
                variant="secondary"
                className="w-full max-w-xs py-4 text-lg"
                onClick={() => navigate("/how-to-play")}
              >
                📖 How To Play
              </Button>
            </div>
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
