"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Card {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
}

export const CardStack = ({ items }: { items: Card[] }) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [cards.length, autoPlay]);

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  return (
    <div className="relative w-full max-w-md h-80">
      <AnimatePresence>
        {cards.map((card, index) => {
          const isActive = index === currentIndex;
          const offset = (index - currentIndex + cards.length) % cards.length;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`absolute w-full p-8 rounded-lg glass-card cursor-pointer transition-all ${
                isActive ? "ring-2 ring-[#FF7A00]" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: offset * 10,
                  zIndex: cards.length - offset,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
              <div className="mb-4">
                {card.content}
              </div>
              <div className="border-t border-[#2a2a2a] pt-4">
                <p className="font-bold text-[#F5EBDD]">{card.name}</p>
                <p className="text-sm text-[#FF7A00]">{card.designation}</p>
              </div>
              </motion.div>
            </div>
          );
        })}
      </AnimatePresence>

      {/* Click indicator dots */}
      <div className="flex justify-center gap-2 mt-96 pt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-[#FF7A00] w-6" : "bg-[#F5EBDD]/30 w-2"
            }`}
          >
            <motion.button whileHover={{ scale: 1.2 }} />
          </button>
        ))}
      </div>
    </div>
  );
};
