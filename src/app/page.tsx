"use client";

import { Hero } from "@/components/Hero";
import { CardSection } from "@/components/CardSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-[1000dvh]">
      <main className="max-width-container h-full">
        <Hero />

        <CardSection />
        <ThemeToggle />
      </main>
    </div>
  );
}
