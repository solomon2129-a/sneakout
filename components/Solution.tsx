"use client";

import { motion } from "framer-motion";

const benefits = [
  { title: "Plan with Structure", desc: "Turn ideas into action. Set timelines, track tasks, and stay organized from concept to execution." },
  { title: "Execute with Confidence", desc: "Everything you need to run the event — confirmations, logistics, and real-time coordination." },
  { title: "Build Your Reputation", desc: "Every successful event builds your credibility. Show the scene you're reliable." },
];

export const Solution = () => {
  return (
    <section className="py-20 px-4 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#F5EBDD]">
            One tool. Less chaos. Better events.
          </h2>
          </motion.div>
        </div>

        <div className="text-center mb-16 text-lg text-[#F5EBDD]/70">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Sneakout brings order to the beautiful chaos of event organizing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="glass-card p-8 rounded-lg hover-lift">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full mb-6 text-sm font-bold text-white bg-gradient-to-br from-[#980B07] to-[#B30E0A]">
                {i + 1}
              </div>
                <h3 className="text-xl font-bold mb-4 text-[#F5EBDD]">{b.title}</h3>
                <p className="leading-relaxed text-[#F5EBDD]/70">{b.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
