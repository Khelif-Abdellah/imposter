import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 35;
const COLORS = [
  "#ffffff",
  "#818cf8", // indigo
  "#a78bfa", // violet
  "#38bdf8", // sky
];

function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
      id: index,

      left: Math.random() * 100,

      top: Math.random() * 100,

      size: Math.random() * 4 + 2,

      duration: Math.random() * 8 + 10,

      delay: Math.random() * 5,

      opacity: Math.random() * 0.4 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      glow: Math.random() * 12 + 8,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            opacity: particle.opacity,
          }}
          animate={{
            x: [-15, 20, -10, 15, 0],
            y: [0, -35, -60, -30, 0],
            opacity: [
              particle.opacity,
              particle.opacity + 0.2,
              particle.opacity,
            ],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,

            // 👇 New
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.glow}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingParticles;
