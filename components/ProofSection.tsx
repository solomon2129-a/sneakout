"use client";

import { motion } from "framer-motion";

export const ProofSection = () => {
  const stats = [
    { value: '6+', label: 'live events', icon: '🎪' },
    { value: '₹42L+', label: 'in community-run experiences', icon: '💵' },
    { value: 'Bengaluru', label: 'Built with organizers in Bangalore', icon: '🌆' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="proof" className="py-16 px-6 bg-[#070707] border-t border-[#141414]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="py-8 relative group">
                <motion.div 
                  variants={statVariants}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-5xl mb-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                  <div 
                    className="text-5xl font-extrabold bg-gradient-to-br from-[#980B07] to-[#E5E5E5] bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-secondary/70 mt-2">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                    >
                      {stat.label}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <blockquote className="mt-12 text-secondary/80 italic text-lg font-light">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
          >
            "Finally, something built for people who actually throw events."
          </motion.div>
        </blockquote>
      </div>
    </section>
  );
};
