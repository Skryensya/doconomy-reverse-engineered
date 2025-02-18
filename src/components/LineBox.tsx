import React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LineBoxProps {
  l?: boolean;
  r?: boolean;
  t?: boolean;
  b?: boolean;
  x?: boolean;
  y?: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number | { l?: number; r?: number; t?: number; b?: number };
  fullWidth?: boolean;
}

const BASE_DELAY = 0.2;

export function LineBox({
  l,
  r,
  t,
  b,
  x,
  y,
  children,
  className,
  delay = 0,
  fullWidth = true,
}: LineBoxProps) {
  // Determinamos cuáles líneas activar
  const left = l || (x && !r);
  const right = r || (x && !l);
  const top = t || (y && !b);
  const bottom = b || (y && !t);

  // Helper para delays individuales
  const getDelay = (side: "l" | "r" | "t" | "b") => {
    if (typeof delay === "number") {
      return delay + BASE_DELAY;
    }
    return (delay[side] ?? 0) + BASE_DELAY;
  };

  // Animación horizontal (scaleX)
  const horizontalLine = (side: "t" | "b") => ({
    initial: { scaleX: 0, originX: 0 },
    animate: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: getDelay(side),
      },
    },
  });

  // Animación vertical (height)
  const verticalLine = (side: "l" | "r") => ({
    initial: { height: 0, originY: 0 },
    animate: {
      height: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        delay: getDelay(side) + 0.5,
      },
    },
  });

  // Para animar solo al entrar en vista
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Línea superior (horizontal) */}
      {top && (
        <motion.div
          className={`absolute top-0 left-1/2 z-20 h-[1px] ${
            fullWidth ? "w-screen" : "w-full"
          } -translate-x-1/2 transform bg-border`}
          variants={horizontalLine("t")}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        />
      )}

      {/* Línea inferior (horizontal) */}
      {bottom && (
        <motion.div
          className={`absolute bottom-0 left-1/2 z-20 h-[1px] ${
            fullWidth ? "w-screen" : "w-full"
          } -translate-x-1/2 transform bg-border`}
          variants={horizontalLine("b")}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        />
      )}

      {/* Línea izquierda (vertical) */}
      {left && (
        <motion.div
          className="absolute top-0 left-0 z-20 w-[1px] bg-border"
          variants={verticalLine("l")}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        />
      )}

      {/* Línea derecha (vertical) */}
      {right && (
        <motion.div
          className="absolute top-0 right-0 z-20 w-[1px] bg-border"
          variants={verticalLine("r")}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        />
      )}

      {children}
    </div>
  );
}
