import { LineBox } from "./LineBox";
import { Button } from "./Button";
import { DisplayUnfold } from "./DisplayUnfold";

export function Hero() {
  return (
    <LineBox x b>
      <div className="bg-background px-4 py-20">
        <div className="max-width-container">
          <h1 className="font-display text-8xl">
            <DisplayUnfold text="SOLUCIONES INNOVADORAS" delay={0.5} />
            <DisplayUnfold text="A PROBLEMAS COMPLEJOS" delay={1} />
          </h1>
        </div>
      </div>
      <LineBox t className="4 relative px-4">
        <div className="absolute top-0 left-0 h-full w-full !opacity-25"></div>
        <div className="flex pl-20">
          <Button variant="primary">Button primary</Button>
          <Button variant="secondary">Button secondary</Button>
        </div>
      </LineBox>
    </LineBox>
  );
}
