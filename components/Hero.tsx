"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  const sneakoutLetters = "SNEAKOUT".split("");

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
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Gritty background layers */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/grain.png')] mix-blend-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent">
          <motion.div
            animate={{ opacity: [0.06, 0.15, 0.06] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-6 flex justify-center items-baseline gap-2">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sneakoutLetters.map((letter, i) => (
                <span key={i} className="text-[72px] md:text-[120px] lg:text-[160px] font-black heading-font tracking-tight leading-none text-secondary">
                  <motion.span variants={letterVariants}>
                    {letter}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-secondary/90">Where underground culture gets organized.</p>
          <p className="mt-3 text-sm text-secondary/70">Built for the people who actually make the scene happen.</p>

          <div className="mt-8 flex justify-center items-center">
            <a href="#join" className="inline-block bg-accent text-primary px-6 py-3 rounded-md font-semibold shadow-sm">
              <motion.div 
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(152, 11, 7, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                Enter the scene
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <button onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })} className="flex flex-col items-center text-sm text-secondary/70">
          <span>Scroll</span>
          <svg className="w-6 h-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        </motion.div>
      </div>
    </section>
  );
};
