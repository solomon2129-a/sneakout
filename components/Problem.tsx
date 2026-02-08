"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "📱",
    title: "Scattered Conversations",
    desc: "Managing vendors across WhatsApp groups, Instagram DMs, and forgotten email threads.",
  },
  {
    icon: "⚡",
    title: "Last-Minute Chaos",
    desc: "Confirming vendors 2 hours before doors open because nothing's in writing.",
  },
  {
    icon: "🚫",
    title: "Zero Trust",
    desc: "Working with new providers feels like a gamble. Will they show up? Will they deliver?",
  },
  {
    icon: "🎫",
    title: "Ticketing Nightmares",
    desc: "Tracking RSVPs across 5 platforms while manually checking people in at the door.",
  },
];

export const Problem = () => {
  return (
    <section id="problem-section" className="py-32 px-6 bg-primary border-b border-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-secondary">
            Events are hard. <br />They shouldn't be impossible.
          </h2>
          <p className="text-xl text-secondary/70 max-w-2xl mx-auto mt-6">
            Every organizer faces the same problems. Sneakout solves them.
          </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="p-8 rounded-xl bg-[#171717] border border-[#141414] hover:border-[#980B07]/50 transition-all duration-300 group relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateY: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(152,11,7,0.12)",
                }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
              {/* Hover glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#980B07]/0 via-[#980B07]/0 to-[#980B07]/0 group-hover:from-[#980B07]/10 group-hover:via-[#980B07]/5 group-hover:to-[#980B07]/10 rounded-xl blur-xl transition-all duration-500 -z-10" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-[#980B07] transition-colors">{p.title}</h3>
                <p className="text-secondary/70 group-hover:text-secondary/90 transition-colors">{p.desc}</p>
              </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
