"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Create Your Event", desc: "Set the vision. Add details. Build your plan." },
  { num: "02", title: "Coordinate Everything", desc: "Manage logistics, confirmations, and execution in one place." },
  { num: "03", title: "Run the Event", desc: "Show up confident. Everything's handled." },
];

export const HowItWorks = () => {
  return (
    <section id="how" className="py-20 px-4 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#F5EBDD]">
            Simple to start. Powerful to scale.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-16 text-lg text-[#F5EBDD]/70"
        >
          Three steps. Complete control.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 relative rounded-lg hover-lift"
            >
              <div className="text-5xl font-bold mb-6 text-[#FF7A00] opacity-30">{s.num}</div>
              <h3 className="text-2xl font-bold mb-4 text-[#F5EBDD]">{s.title}</h3>
              <p className="text-[#F5EBDD]/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
