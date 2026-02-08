"use client";

import { motion } from "framer-motion";

export const RoleSection = () => {
  const pillars = [
    { title: 'Trust', description: 'Know who delivers', icon: '🤝', color: 'from-[#980B07]/20 to-transparent' },
    { title: 'Structure', description: 'Keep things from falling apart', icon: '🏗️', color: 'from-[#FF7A00]/20 to-transparent' },
    { title: 'Transactions', description: 'Money handled properly', icon: '💰', color: 'from-[#E5E5E5]/20 to-transparent' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="role" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="heading-font text-3xl md:text-5xl font-bold mb-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Sneakout is the layer that brings trust to the chaos.
          </motion.div>
        </h3>

        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pillars.map((pillar, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.08,
                  borderColor: "rgba(152, 11, 7, 0.6)",
                  boxShadow: "0 10px 40px rgba(152, 11, 7, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-6 bg-[#0F0F0F] border border-[#1A1A1A] rounded-lg relative overflow-hidden group bg-gradient-to-br ${pillar.color}`}>
                  <div className="absolute top-3 right-3">
                    <div className="text-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        {pillar.icon}
                      </motion.div>
                    </div>
                  </div>
                  <h5 className="font-bold text-white mb-2 text-lg">{pillar.title}</h5>
                  <p className="text-sm text-secondary/70">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
