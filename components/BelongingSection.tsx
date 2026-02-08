"use client";

import { motion } from "framer-motion";

export const BelongingSection = () => {
  const words = "A new wave of organizers is building culture differently".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="belonging" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="heading-font text-3xl md:text-5xl font-bold flex flex-wrap justify-center gap-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <p className="mt-4 text-secondary/80 text-lg font-medium">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            More trust. More collaboration. Less chaos.
          </motion.p>
        </p>

        <p className="mt-6 text-secondary/70 text-base">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block font-bold text-[#980B07]"
            >
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                This is not an app.
              </motion.span>
            </span>
            {" "}It's a movement — and it's led by people who care for the scene.
          </motion.p>
        </p>
      </div>
    </section>
  );
};
