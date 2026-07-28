import { motion } from "framer-motion";

function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Top gradient */}
      <motion.div
        animate={{
          x: [-120, 120, -120],
          y: [-60, 40, -60],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-40
          -top-40
          h-105
          w-105
          rounded-full
          bg-indigo-600/20
          blur-3xl
        "
      />

      {/* Bottom gradient */}
      <motion.div
        animate={{
          x: [80, -120, 80],
          y: [40, -80, 40],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-45
          -right-45
          h-125
          w-125
          rounded-full
          bg-purple-700/15
          blur-3xl
        "
      />

      {/* Center glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-95
          w-95
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,transparent_35%,rgba(2,6,23,.9)_100%)]
        "
      />
    </div>
  );
}

export default AnimatedBackground;
