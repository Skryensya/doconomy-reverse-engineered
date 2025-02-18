import React from "react";
import { motion } from "framer-motion";

interface RevealerProps {
  /** Contenido a revelar: puede ser imagen, texto, lo que gustes. */
  children: React.ReactNode;
  /** Dirección desde donde se “abre la cortina”. */
  direction?: "left" | "right" | "top" | "bottom";
  /** Momento (en segundos) de retraso antes de iniciar la animación. */
  delay?: number;
  /** Duración de la animación (en segundos). */
  duration?: number;
  /** Clase extra para dar estilos. */
  className?: string;
  /** Estilos inline. */
  style?: React.CSSProperties;
  /** Control externo: si `revealed` es `false`, la cortina sigue tapando. */
  revealed?: boolean;
  /** Color de la cortina o cualquier estilo de fondo (puede ser un gradiente). */
  curtainColor?: string;
}

export function Revealer({
  children,
  direction = "left",
  delay = 0,
  duration = 1,
  className,
  style,
  revealed = false,
  curtainColor = "var(--bg-primary)",
}: RevealerProps) {
  // Definimos la posición inicial (initial) y final (animate) según la dirección
  let initial: Record<string, string> = {};
  let animate: Record<string, string> = {};

  switch (direction) {
    case "left":
      initial = { x: "0%" };
      animate = { x: "100%" };
      break;
    case "right":
      initial = { x: "0%" };
      animate = { x: "-100%" };
      break;
    case "top":
      initial = { y: "0%" };
      animate = { y: "-100%" };
      break;
    case "bottom":
      initial = { y: "0%" };
      animate = { y: "100%" };
      break;
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden", // Evita que la cortina se salga del contenedor
        ...style,
      }}
    >
      {/** Contenido a revelar */}
      {children}

      {/** Cortina que se anima para descubrir el contenido */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: curtainColor,
          pointerEvents: "none", // Opcional, para no bloquear clics en el contenido una vez revelado
        }}
        initial={initial}
        animate={revealed ? animate : initial}
        transition={{ duration, ease: "easeInOut", delay }}
      />
    </div>
  );
}
