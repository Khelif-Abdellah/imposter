import { motion } from "framer-motion";

function PageTransition({ children, className = "" }) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -25,
      }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.main>
  );
}

export default PageTransition;
