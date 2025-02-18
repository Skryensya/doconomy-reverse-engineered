import React from "react";
import { motion } from "framer-motion";

interface DisplayUnfoldProps {
  text: string;
  className?: string;
  delay?: number;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      // Desfase entre animaciones de líneas
      staggerChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: {
    // Arranca doblada hacia atrás, como si viniera “desde arriba”
    rotateX: -90,
    transformOrigin: "top center",
    opacity: 0,
    // Ajusta si quieres que aparezca un poco más arriba o abajo
    y: 0,
  },
  show: (customDelay: number) => ({
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: customDelay,
    },
  }),
};

export function DisplayUnfold({ text, className, delay = 0 }: DisplayUnfoldProps) {
  // Separar el texto en líneas
  const lines = text.split("\n");

  return (
    <motion.div
      className={className}
      // La perspectiva para el efecto 3D
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {lines.map((line, idx) => (
        <motion.div
          key={idx}
          variants={lineVariants}
          custom={delay}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Ojo: puedes usar h1, p, span... lo que prefieras */}
          <h1 style={{ margin: 0 }}>{line}</h1>
        </motion.div>
      ))}
    </motion.div>
  );
}
