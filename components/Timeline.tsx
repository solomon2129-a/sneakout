"use client";

import { motion } from "framer-motion";

export const Timeline = () => {
  const steps = [
    {
      step: "01",
      title: "Create Your Event",
      description: "Set the vision. Add details. Build your plan.",
    },
    {
      step: "02",
      title: "Coordinate Everything",
      description: "Manage logistics, confirmations, and execution in one place.",
    },
    {
      step: "03",
      title: "Run the Event",
      description: "Show up confident. Everything's handled.",
    },
  ];

  return (
    <section
      id="how"
      className="py-32 px-6 bg-[#0A0A0A] border-b border-[#2A2A2A] relative overflow-hidden"
    >
      {/* Accent elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[#980B07] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Simple to start.<br />Powerful to scale.
          </h2>
          <p className="text-xl text-secondary/70">
            Three steps. Complete control.
          </p>
          </motion.div>
        </div>

        <div className="space-y-24">
          {steps.map((item, index) => (
            <div className="flex items-start gap-12 group">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 relative">
                  <div 
                    className="text-9xl font-black text-[#980B07] leading-none group-hover:scale-110 transition-transform"
                  >
                    <motion.div
                      whileHover={{ 
                        textShadow: "0 0 30px rgba(255, 107, 53, 0.5)",
                      }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  {/* Animated glow behind number */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#980B07]/20 to-transparent rounded-full blur-2xl -z-10">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    />
                  </div>
                </div>
                <div 
                   className="flex-1 pt-8"
                >
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-[#980B07] transition-colors">
                  {item.title}
                </h3>
                  <p className="text-xl text-secondary/70 leading-relaxed group-hover:text-secondary/80 transition-colors">
                    {item.description}
                  </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Connecting line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-24 top-32 w-1 h-24 bg-gradient-to-b from-[#980B07]/50 to-transparent">
                  <motion.div 
                    animate={{ scaleY: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
