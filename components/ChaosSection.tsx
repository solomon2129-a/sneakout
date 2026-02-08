"use client";

import { motion } from "framer-motion";

export const ChaosSection = () => {
  const problems = [
    { title: 'Deposits vanish', icon: '💸' },
    { title: 'Vendors ghost', icon: '👻' },
    { title: 'Plans collapse', icon: '⚡' },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="chaos" className="py-20 px-6 bg-primary border-t border-[#141414]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 text-secondary">
            Great events die in WhatsApp chats.
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <p className="text-secondary/70 max-w-3xl mx-auto text-lg">
            Deposits disappear. Vendors ghost. Nobody knows who's reliable.
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {problems.map((item, i) => (
              <div 
                key={i} 
                className="p-6 bg-[#161616] border border-[#141414] rounded-lg relative overflow-hidden group"
              >
                <motion.div 
                  variants={cardVariants}
                  whileHover={{ 
                    borderColor: "rgba(152, 11, 7, 0.5)",
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(152, 11, 7, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#980B07]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl mb-3">
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <h4 className="font-bold text-secondary mb-2 text-lg">{item.title}</h4>
                  <p className="text-sm text-secondary/70">Raw, bold, and true — the backstage reality of running culture.</p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
