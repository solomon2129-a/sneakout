"use client";

import { motion } from "framer-motion";

export const RoleSection = () => {
  const pillars = [
    { title: 'Trust', description: 'Know who delivers', icon: 'handshake', color: 'from-[#980B07]/20' },
    { title: 'Structure', description: 'Keep things from falling apart', icon: 'building', color: 'from-[#980B07]/10' },
    { title: 'Transactions', description: 'Money handled properly', icon: 'wallet', color: 'from-[#E5E5E5]/20' },
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
    hidden: { opacity: 0, y: 50, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="role" className="py-28 px-6 bg-gradient-to-b from-[#0A0A0A] to-primary">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="heading-font text-5xl md:text-6xl font-bold text-center leading-relaxed mb-12 text-secondary">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Sneakout brings trust to the chaos.
          </motion.div>
        </h2>

        {/* Subheading */}
        <motion.div
          className="text-center text-lg text-secondary/70 mb-16 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          We solve what matters most in underground culture events
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {pillars.map((pillar, i) => (
              <div key={i} className="group">
                <motion.div variants={cardVariants} whileHover={{ y: -16, boxShadow: "0 30px 80px rgba(152, 11, 7, 0.25)" }}>
                  <div className={`h-full p-8 bg-gradient-to-br ${pillar.color} to-transparent border border-[#1A1A1A] rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#980B07]/40`}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#980B07]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Icon with rotation */}
                      <div className="w-12 h-12 text-[#980B07]">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
                          {pillar.icon === 'handshake' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>}
                          {pillar.icon === 'building' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>}
                          {pillar.icon === 'wallet' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18 6h-2c0-2.66-2.24-4.75-5-4.75S6 3.34 6 6H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 9c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>}
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-bold text-secondary">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-secondary/80 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Accent line at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#980B07]/0 via-[#980B07] to-[#980B07]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div layoutId={`pillar-accent-${i}`} />
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
