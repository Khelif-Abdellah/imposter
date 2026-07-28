import { motion } from "framer-motion";

function FadeIn({ children, delay = 0, duration = 0.5, className = "" }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
