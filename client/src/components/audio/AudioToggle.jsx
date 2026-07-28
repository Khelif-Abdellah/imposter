import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import useAudio from "../../hooks/useAudio";

function AudioToggle() {
  const { muted, toggleMute } = useAudio();

  return (
    <motion.button
      onClick={toggleMute}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        border
        border-slate-700

        bg-slate-900/80
        backdrop-blur-md

        text-white

        shadow-2xl

        transition-colors

        hover:bg-slate-800
      "
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </motion.button>
  );
}

export default AudioToggle;
