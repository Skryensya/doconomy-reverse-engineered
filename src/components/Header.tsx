"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LineBox } from "./LineBox";
export default function Header() {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (currentScrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const sections = [
    { title: "Servicios", description: "¿Que hacemos?", href: "#" },
    { title: "Proyectos", description: "Casos de éxito", href: "#" },
    { title: "Equipo", description: "Conoce a nuestro equipo", href: "#" },
    { title: "Contacto", description: "Contacta con nosotros", href: "#" },
  ];

  return (
    <header
      className={`border:inset-0 @container sticky top-0 right-0 left-0 z-50 bg-background transition-transform duration-300 ${
        isScrollingDown ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <LineBox b>
        <div className="max-width-container flex h-15">
          <div className="h-fit">
            <LineBox className="pr-24" l>
              <Image
                src="/assets/img/type-logo.svg"
                alt="Asimov Consultores"
                className="h-15 object-cover transition-all duration-300 hover:cursor-pointer"
                width={160}
                height={80}
              />
            </LineBox>
          </div>

          <div className={cn("h-15 grow")}>
            <LineBox x className="flex h-full items-center justify-between">
              <div className="hidden h-full items-center justify-center @3xl:flex">
                {sections.map((section, index) => (
                  <LineBox
                    key={index}
                    r
                    className="group flex h-full grow items-center justify-center bg-background px-6 font-display"
                    delay={(index + 1) * 0.1}
                  >
                    <a
                      href={section.href}
                      key={index}
                      className="group flex h-full grow items-center justify-center px-6 font-display"
                    >
                      <span className="text-md font-semibold">
                        {section.title}
                      </span>
                    </a>
                  </LineBox>
                ))}
              </div>
            </LineBox>
          </div>
        </div>
      </LineBox>
    </header>
  );
}
