import React from "react";
import { motion } from "framer-motion";

interface HoverTransformProps {
  /** Contenido a inclinar (texto, imágenes, etc.) */
  children: React.ReactNode;
  /** Perspectiva para el efecto 3D (mayor valor = menos “deformación”) */
  perspective?: number;
  /** Cuántos grados de inclinación máximo */
  tilt?: number;
}

/**
 * Divide el espacio en 9 cuadrantes (3x3).
 * La esquina/borde donde está el mouse “salta” hacia el usuario.
 * La esquina opuesta se mantiene anclada (transformOrigin).
 */
export function HoverTransform({
  children,
  perspective = 1000,
  tilt = 10, // un poco más pronunciado
}: HoverTransformProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Guardamos la rotación y el origen de transformación
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = React.useState("center center");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const xPos = e.clientX - rect.left; // X relativo al contenedor
    const yPos = e.clientY - rect.top; // Y relativo al contenedor

    // Dividimos el ancho y el alto en 3 secciones para 3 columnas x 3 filas
    const colWidth = rect.width / 3;
    const rowHeight = rect.height / 3;

    // Determina en qué columna (0,1,2) y fila (0,1,2) está el mouse
    const col = Math.floor(xPos / colWidth); // 0,1,2
    const row = Math.floor(yPos / rowHeight); // 0,1,2

    /**
     * Asignamos el transformOrigin OPUESTO para que la esquina/borde
     * donde esté el mouse “salte” hacia el usuario.
     *
     * row=0 => pivot en "bottom", row=2 => pivot en "top", row=1 => "center"
     * col=0 => pivot en "right",  col=2 => pivot en "left", col=1 => "center"
     */
    let originY = "center";
    let originX = "center";

    if (row === 0) originY = "bottom";
    else if (row === 2) originY = "top";

    if (col === 0) originX = "right";
    else if (col === 2) originX = "left";

    setTransformOrigin(`${originY} ${originX}`);

    /**
     * Definimos la rotación para que la esquina/borde (donde está el mouse)
     * sea la que se eleve hacia el usuario.
     *
     * row=0 => parte superior => rotateX negativo (top sube)
     * row=2 => parte inferior => rotateX positivo (bottom sube)
     * row=1 => sin inclinación vertical
     *
     * col=0 => parte izquierda => rotateY negativo (left sube)
     * col=2 => parte derecha => rotateY positivo (right sube)
     * col=1 => sin inclinación horizontal
     */
    let rotateX = 0;
    let rotateY = 0;

    if (row === 0) rotateX = -tilt;
    else if (row === 2) rotateX = tilt;

    if (col === 0) rotateY = -tilt;
    else if (col === 2) rotateY = tilt;

    setRotation({ x: rotateX, y: rotateY });
  }

  // Cuando el mouse sale del contenedor, reseteamos rotación y origen
  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
    setTransformOrigin("center center");
  }

  return (
    <div
      ref={containerRef}
      style={{
        perspective: `${perspective}px`, // Necesaria para el efecto 3D
        display: "block", // Se ajusta al tamaño padre
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          // Evita que los hijos reciban directamente eventos de mouse
          pointerEvents: "none",
          transformStyle: "preserve-3d",
          // Actualizamos el origen de la transformación según el cuadrante
          transformOrigin: transformOrigin,
          width: "100%",
          height: "100%",
        }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
