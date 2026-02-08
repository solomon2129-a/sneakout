"use client";

import { motion } from "framer-motion";

export const CultureSection = () => {
  const listItems = ["Pop-up gigs", "Warehouse shows", "Rooftop scenes", "DIY culture"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="culture" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="heading-font text-4xl md:text-5xl font-bold leading-tight mb-4">The best events don't come from companies.<br/>They come from communities.</h2>
          <p className="text-secondary/80 mt-4 max-w-xl">Built by people who throw shows, book artists, sell records, and keep the lights on. Sneakout is for organizers, artists, venues, and vendors who treat culture like caretaking, not a product spec.</p>

          <ul className="mt-6 flex flex-col gap-3 text-secondary/80">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {listItems.map((item, i) => (
                <li 
                  key={i}
                  className="text-lg font-medium flex items-center"
                >
                  <motion.li 
                    variants={itemVariants}
                  >
                  <span className="text-[#980B07] mr-3 text-xl">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                    >
                      ◆
                    </motion.span>
                  </span>
                  {item}
                  </motion.li>
                </li>
              ))}
            </motion.div>
          </ul>
        </motion.div>

        <div className="w-full overflow-hidden rounded-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotateY: 60 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ perspective: "1000px" }}
          >
            <div className="w-full h-72 bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#171717] rounded-lg relative overflow-hidden shadow-2xl">
              <motion.div 
                whileHover={{ y: -10, boxShadow: "0 20px 60px rgba(152, 11, 7, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
              <div className="absolute inset-0 mix-blend-overlay opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,107,53,0.12), transparent 10%), radial-gradient(circle at 90% 80%, rgba(255,107,53,0.08), transparent 20%)' }} />
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect width="100%" height="100%" fill="black" />
                <g fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1">
                  <path d="M0 200 Q200 100 400 200 T800 200" />
                </g>
              </svg>
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-black/40 px-3 py-2 rounded text-xs text-secondary/80">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Pop-up gig — photo credit: local
                  </motion.div>
                </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
