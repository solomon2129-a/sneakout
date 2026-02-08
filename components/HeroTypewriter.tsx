"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export const HeroTypewriter = () => {
  const words = [
    { text: "Make" },
    { text: "underground" },
    { text: "culture" },
    { text: "investable.", className: "text-[#FF7A00]" },
  ];

  return <TypewriterEffectSmooth words={words} />;
};
