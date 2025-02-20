import { LineBox } from "./LineBox";
import { Button } from "./Button";
import { DisplayUnfold } from "./DisplayUnfold";
import { FlickeringGrid } from "./FlickeringGrid";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <LineBox x b>
      <div className="px-8 py-20">
        <div className="max-width-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FlickeringGrid
              className="absolute inset-0 z-0 size-full"
              squareSize={20}
              gridGap={10}
              color="#6B7280"
              maxOpacity={0.5}
              flickerChance={0.9}
            />
          </motion.div>
          <h1 className="font-display text-8xl">
            <DisplayUnfold text="SOLUCIONES INNOVADORAS" delay={0.5} />
            <DisplayUnfold text="A PROBLEMAS COMPLEJOS" delay={1} />
          </h1>
        </div>
      </div>
      <LineBox t className="4 relative px-4">
        <div className="absolute top-0 left-0 h-full w-full bg-background"></div>
        <div className="flex pl-20">
          <Button variant="primary">Button primary</Button>
          <Button variant="secondary">Button secondary</Button>
        </div>
      </LineBox>
    </LineBox>
  );
}
