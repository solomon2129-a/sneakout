"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "phone",
    title: "Scattered Conversations",
    desc: "Managing vendors across WhatsApp groups, Instagram DMs, and forgotten email threads.",
  },
  {
    icon: "zap",
    title: "Last-Minute Chaos",
    desc: "Confirming vendors 2 hours before doors open because nothing's in writing.",
  },
  {
    icon: "x",
    title: "Zero Trust",
    desc: "Working with new providers feels like a gamble. Will they show up? Will they deliver?",
  },
  {
    icon: "ticket",
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
                <div className="w-10 h-10 mb-4 text-[#980B07] transform group-hover:scale-125 transition-all duration-300">
                  {p.icon === 'phone' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17 2H7c-1.1 0-1.99.9-1.99 2v14c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-3H7V4h10v13z"/></svg>}
                  {p.icon === 'zap' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
                  {p.icon === 'x' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>}
                  {p.icon === 'ticket' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 18H5v-5h9v5zm4 0h-4v-5h4v5zm0-7H5V5h14v9z"/></svg>}
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
