"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const EarlyAccessCTA = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventType: "",
    instagram: "",
    eventDesc: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sneakoutEarlyAccess", JSON.stringify(form));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        eventType: "",
        instagram: "",
        eventDesc: "",
      });
    }, 5000);
  };

  return (
    <section
      id="cta"
      className="py-32 px-6 bg-[#0A0A0A] border-t border-[#2A2A2A] relative overflow-hidden"
    >
      {/* Floating orbs background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#980B07] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 3,
          }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-[#980B07] rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Be part of the<br />first wave
          </h2>
          <p className="text-xl text-secondary/70">
            Sneakout launches in Bangalore in 3 months. Request early access and
            help us build the tool you've always needed.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 p-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="text-6xl mb-4"
              >
                ✓
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Thanks for joining
              </h3>
              <p className="text-secondary/70">
                We'll reach out as soon as early access opens.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="px-6 py-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#980B07] focus:outline-none focus:ring-2 focus:ring-[#980B07]/20 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-6 py-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#980B07] focus:outline-none focus:ring-2 focus:ring-[#980B07]/20 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="px-6 py-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white focus:border-[#980B07] focus:outline-none focus:ring-2 focus:ring-[#980B07]/20 transition-all"
                >
                  <option value="">Event type</option>
                  <option value="music">Music</option>
                  <option value="art">Art</option>
                  <option value="festival">Festival</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram handle (optional)"
                  value={form.instagram}
                  onChange={handleChange}
                  className="px-6 py-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#980B07] focus:outline-none focus:ring-2 focus:ring-[#980B07]/20 transition-all"
                />
              </div>

              <textarea
                name="eventDesc"
                placeholder="Tell us about your next event (optional)"
                rows={4}
                value={form.eventDesc}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:border-[#980B07] focus:outline-none focus:ring-2 focus:ring-[#980B07]/20 transition-all resize-none"
              />

              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 40px rgba(255, 107, 53, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 bg-[#980B07] hover:bg-[#980B07]/90 text-white text-lg font-bold rounded-lg transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Request Early Access</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ opacity: 0.2 }}
                />
              </motion.button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
};
