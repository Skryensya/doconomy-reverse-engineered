import { Card } from "./Card";
import { LineBox } from "./LineBox";

export function CardSection() {
  const cardData = [
    { aspectRatio: "1/1", from: "left" },
    { aspectRatio: "3/4", from: "left" },
    { aspectRatio: "1/1", from: "left" },
    { aspectRatio: "3/4", from: "left" },
    { aspectRatio: "1/1", from: "left" },
  ];

  const delayMultiplier = 0.3; // Fixed number for delay calculation

  return (
    <LineBox x b className="grid w-full grid-flow-row-dense grid-cols-5">
      {cardData.map((card, index) => (
        <LineBox key={index} className="col-span-1" l>
          <Card
            className="break-inside-avoid"
            aspectRatio={card.aspectRatio}
            delay={delayMultiplier * (index + 1)}
            from={card.from as "left" | "right" | "top" | "bottom"}
          />
        </LineBox>
      ))}
    </LineBox>
  );
}
