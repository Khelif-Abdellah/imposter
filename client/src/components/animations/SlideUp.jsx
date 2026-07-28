import { motion } from "framer-motion";

function SlideUp({
  children,
  index,
  delay = 0,
  duration = 0.5,
  distance = 30,
  className = "",
}) {
  const animationDelay = index !== undefined ? index * 0.15 : delay;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration,
        delay: animationDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SlideUp;
