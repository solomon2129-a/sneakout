"use client";

import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedPhotoGrid } from "./AnimatedPhotoGrid";

export const Hero = () => {
  const sneakoutLetters = "SNEAKOUT".split("");
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.2,
      color: "#980B07",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Animated photo grid background */}
      <AnimatedPhotoGrid />

      {/* Animated gritty overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/grain.png')] mix-blend-overlay">
          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 flex justify-center items-baseline gap-2">
            <div className="flex justify-center items-baseline gap-1 md:gap-2 flex-wrap">
              <div className="flex">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ display: "flex", width: "100%" }}
                >
                  {sneakoutLetters.map((letter, i) => (
                    <span key={i} className="text-[48px] sm:text-[72px] md:text-[100px] lg:text-[160px] font-black heading-font tracking-widest leading-none text-secondary cursor-pointer">
                      <motion.span 
                        variants={letterVariants}
                        whileHover="hover"
                      >
                        {letter}
                      </motion.span>
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="text-base sm:text-lg md:text-2xl lg:text-3xl font-semibold text-secondary/90 leading-relaxed tracking-wide max-w-3xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Where underground culture gets organized.
            </motion.p>
          </div>
          
          <div className="mt-4 text-sm sm:text-base md:text-lg text-secondary/70 leading-relaxed tracking-wide max-w-2xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
          >
            Built for the people who actually make the scene happen.
            </motion.p>
          </div>

          <div className="mt-8 md:mt-12 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <a href="#join" className="inline-block">
                <div className="bg-accent text-primary px-6 sm:px-8 py-3 sm:py-4 md:px-12 md:py-5 rounded-lg font-bold text-sm sm:text-lg md:text-xl shadow-lg min-w-[180px] sm:min-w-[200px] cursor-pointer flex items-center justify-center relative overflow-hidden group">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 40px rgba(152, 11, 7, 0.8)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                <span className="relative z-10">Enter the Scene</span>
                <div className="absolute inset-0 bg-white/20 rounded-lg">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                  </motion.div>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 12, 0] }} 
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <button 
            onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })} 
            className="flex flex-col items-center gap-2 text-secondary/60 hover:text-secondary transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-widest font-semibold">Scroll</span>
            <div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
