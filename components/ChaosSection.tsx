"use client";

import { motion } from "framer-motion";

export const ChaosSection = () => {
  const problems = [
    { title: 'Deposits vanish', description: 'Money disappears into the void', icon: 'money' },
    { title: 'Vendors ghost', description: 'Unreliable partners drop unexpectedly', icon: 'ghost' },
    { title: 'Plans collapse', description: 'Chaos takes over, nothing gets resolved', icon: 'zap' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="chaos" className="py-28 px-6 bg-gradient-to-b from-primary to-[#0A0A0A] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#980B07]/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-font text-5xl md:text-6xl font-bold leading-relaxed mb-6 text-secondary">
              Great events die in WhatsApp chats.
            </h3>
            <p className="text-lg md:text-xl text-secondary/70 leading-relaxed max-w-3xl mx-auto">
              Deposits disappear. Vendors ghost. Nobody knows who's reliable.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
            {problems.map((item, i) => (
              <div key={i} className="relative group">
              <motion.div 
                key={i} 
                variants={cardVariants}
                whileHover={{ y: -12, boxShadow: "0 20px 60px rgba(152, 11, 7, 0.25)" }}
              >
                <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#980B07]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon with bounce animation */}
                  <div className="w-8 h-8 text-[#980B07]">
                    <motion.div 
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {item.icon === 'money' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c2.27-.59 4-1.829 4-3.3 0-1.4-1.6-2.6-3.9-2.6-2.4 0-3.9 1.2-3.9 2.6h-2c0-2.1 1.9-4.6 5.9-4.6 4.3 0 5.9 2.3 5.9 4.6 0 2.17-1.61 3.83-4.3 4.32.45.63.73 1.5.73 2.58 0 1.4-1.6 2.6-3.9 2.6-2.27 0-3.9-1.2-3.9-2.6h-2c0 2.1 1.9 4.6 5.9 4.6 4.3 0 5.9-2.3 5.9-4.6 0-2.29-1.62-3.98-4.4-4.43z"/></svg>}
                      {item.icon === 'ghost' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>}
                      {item.icon === 'zap' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-secondary leading-snug">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-base text-secondary/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 border border-[#980B07] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    whileHover={{ boxShadow: "inset 0 0 20px rgba(152, 11, 7, 0.15)" }}
                  />
                </div>
              </div>
            </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
