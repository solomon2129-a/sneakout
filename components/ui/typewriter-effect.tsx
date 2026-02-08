"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Word {
  text: string;
  className?: string;
}

export const TypewriterEffectSmooth = ({ words }: { words: Word[] }) => {
  const [displayedWords, setDisplayedWords] = useState<Word[]>([]);

  useEffect(() => {
    words.forEach((word, idx) => {
      setTimeout(() => {
        setDisplayedWords((prev) => [...prev, word]);
      }, idx * 100);
    });
  }, [words]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {displayedWords.map((word, idx) => (
          <span key={idx} className={word.className || "text-[#F5EBDD]"}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {word.text}
            </motion.span>
          </span>
        ))}
        <span className="text-[#FF7A00]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </span>
      </motion.div>
    </div>
  );
};
