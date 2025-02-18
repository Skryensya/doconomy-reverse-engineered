"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useThrottle } from "@/hooks/useThrottle";

const buttonBase =
  "font-body flex w-fit  items-center justify-center border border-border text-text-light text-base bg-black cursor-pointer whitespace-nowrap overflow-hidden font-bold uppercase";

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary: "bg-brand text-black",
      secondary: "",
      outline: "",
      disabled:
        "text-gray-500 border-gray-500 bg-gray-200 cursor-not-allowed border-3 !top-0 !left-0",
    },
    justify: {
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      start: "justify-start",
      end: "justify-end",
    },
    size: {
      sm: "text-sm px-2 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    justify: "center",
    size: "md",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "sm" | "md" | "lg";
  disableSound?: boolean;
  disabled?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
}

const BUTTON_ANIMATION_DURATION = 100;

export function Button({
  variant = "primary",
  size = "md",
  className,
  disableSound = false,
  disabled = false,
  defaultWidth = 100,
  defaultHeight = 42,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const [width, setWidth] = useState(defaultWidth);
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
      setWidth(rect.width);
    }
  }, []);

  const playSound = () => {
    const audio = new Audio("/assets/sfx/buttonPress.wav");
    audio.play();
  };

  const throttledPlaySound = useThrottle(playSound, BUTTON_ANIMATION_DURATION);

  const handleClick = () => {
    if (!disableSound && !disabled) {
      throttledPlaySound();
    }
    if (!disabled) {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(
        () => setIsActive(false),
        BUTTON_ANIMATION_DURATION,
      ); // 2 segundos de animación
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="group relative isolate z-30">
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant: disabled ? "disabled" : variant, size }),
          `absolute transition-all duration-[var(--button-animation-duration)] ease-in-out`,
          isActive ? "top-0 left-0" : "-top-3 -left-3",
          className,
        )}
        style={
          {
            "--button-animation-duration": `${BUTTON_ANIMATION_DURATION}ms`,
          } as React.CSSProperties
        }
        onPointerDown={handleClick}
        disabled={disabled}
        {...props}
      />

      <div
        className="relative -z-10 flex w-fit items-center justify-center border-x bg-white/20 px-4 py-3 light:bg-black/20"
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      ></div>
    </div>
  );
}
