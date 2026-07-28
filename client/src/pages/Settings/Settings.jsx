import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { SettingsForm } from "../../components/forms";

import FadeIn from "../../components/animations/FadeIn";
import SlideUp from "../../components/animations/SlideUp";

import useGame from "../../hooks/useGame";

import { getCategories } from "../../services/api";

import { Loading } from "../../components/ui";

function Settings() {
  const navigate = useNavigate();

  const { setSettings } = useGame();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  function handleSubmit(settings) {
    setSettings(settings);
    navigate("/players");
  }

  if (loading) {
    return (
      <section className="flex min-h-[calc(100vh-128px)] flex-col items-center justify-center gap-6">
        <Loading />

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-slate-400"
        >
          Preparing your game...
        </motion.p>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
      <div className="w-full max-w-4xl">
        <FadeIn>
          <div className="text-center">
            <span className="text-5xl">⚙️</span>

            <h1 className="mt-4 text-4xl font-black tracking-wide text-white md:text-5xl">
              GAME SETUP
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Customize your match before revealing the secret word. Choose the
              number of players, imposters, categories, and optional hints.
            </p>
          </div>
        </FadeIn>

        <SlideUp delay={0.2}>
          <div
            className="
              mt-10
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-6
              shadow-2xl
              backdrop-blur-xl
              md:p-10
            "
          >
            <SettingsForm categories={categories} onSubmit={handleSubmit} />
          </div>
        </SlideUp>

        <FadeIn delay={0.5}>
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300">
              <span>👥 4–20 Players</span>
              <span>🎭 Hidden Roles</span>
              <span>💡 Optional Hints</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Settings;
