"use client";

import { motion } from "framer-motion";

export const ChaosSection = () => {
  return (
    <section id="chaos" className="py-20 px-6 bg-primary border-t border-[#141414]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-secondary">
            Great events die in WhatsApp chats.
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <p className="text-secondary/70 max-w-3xl mx-auto">
            Deposits disappear. Vendors ghost. Nobody knows who's reliable.
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {[
            'Deposits vanish',
            'Vendors ghost',
            'Plans collapse last minute',
          ].map((t, i) => (
            <div key={i} className="p-6 bg-[#161616] border border-[#141414] rounded-lg">
              <motion.div initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }} transition={{ delay: 0.08 * i }} viewport={{ once: true }}>
                <h4 className="font-bold text-secondary mb-2">{t}</h4>
                <p className="text-sm text-secondary/70">Raw, bold, and true — the backstage reality of running culture.</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
