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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#F5EBDD]">
            One tool. Less chaos. Better events.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16 text-lg text-[#F5EBDD]/70"
        >
          Sneakout brings order to the beautiful chaos of event organizing.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-lg hover-lift"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full mb-6 text-sm font-bold text-[#1A1A1A] bg-gradient-to-br from-[#FF7A00] to-[#ff8c1a]">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#F5EBDD]">{b.title}</h3>
              <p className="leading-relaxed text-[#F5EBDD]/70">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
