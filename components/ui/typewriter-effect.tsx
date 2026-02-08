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
    <motion.div
      className="flex items-center justify-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {displayedWords.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={word.className || "text-[#F5EBDD]"}
        >
          {word.text}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-[#FF7A00]"
      >
        |
      </motion.span>
    </motion.div>
  );
};
