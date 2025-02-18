import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LineBox } from "./LineBox";
import { Revealer } from "./Revealer";
// import { HoverTransform } from "./HoverTransform";

export function Card({
  className,
  aspectRatio = "16/9",
  delay = 0,
  from = "left",
}: {
  className?: string;
  aspectRatio?: string;
  delay?: number;
  from?: "left" | "right" | "top" | "bottom";
}) {
  // Controla si la imagen ya está lista para “revelarse”
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Revealer
        // Puedes elegir la dirección: "left", "right", "top", "bottom"
        direction={from}
        // Empieza tapado, y en cuanto la imagen cargue => revealed = true
        revealed={imageLoaded}
        delay={delay}
        duration={1}
        // Un color suave de cortina (puede ser tu variable de CSS, hex, etc.)
        // curtainColor="rgba(0,0,0,0.2)"
        // Asegura que el contenedor mantenga la proporción
        style={{ aspectRatio }}
        className="w-full object-cover"
      >
      {/* <HoverTransform tilt={20}> */}
        <div className="h-full min-h-32 w-full min-w-32 aspect-square">
          <Image
            src="/assets/img/dummy2.png"
            alt="Card"
            layout="fill"
            objectFit="cover"
            // Cuando termine de cargar, activamos revealed
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      {/* </HoverTransform> */}
      </Revealer>

      <LineBox t className="p-8 text-xl" fullWidth={false} delay={delay}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam animi ea
        quidem labore dicta, provident recusandae modi libero vitae facere
        doloribus tempora architecto perferendis aut veniam, autem ducimus
        aliquid exercitationem?
      </LineBox>
    </div>
  );
}
