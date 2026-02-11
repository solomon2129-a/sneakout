"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const BelongingSection = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    instagram: "",
  });
  const [submitted, setSubmitted] = useState(false);
  
  const words = "A new wave of organizers is building culture differently".split(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get existing submissions or create new array
    const existing = JSON.parse(localStorage.getItem("sneakoutEarlyAccessList") || "[]");
    existing.push({ ...form, timestamp: new Date().toISOString() });
    localStorage.setItem("sneakoutEarlyAccessList", JSON.stringify(existing));
    
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setForm({ email: "", name: "", phone: "", role: "", instagram: "" });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="join" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-primary relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#980B07]/8 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        {/* Heading with word animations */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2"
          >
            {words.map((word, i) => (
              <span 
                key={i} 
                className="text-secondary inline text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed heading-font"
              >
                <motion.span
                  variants={wordVariants}
                  style={{ display: "inline" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-secondary/80 leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            We're building infrastructure for underground culture. Join the first wave.
          </motion.p>
          </motion.div>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 lg:p-12 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ borderColor: "rgba(152, 11, 7, 0.3)" }}
          >
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    ✓
                  </motion.div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Thanks for joining</h3>
                <p className="text-secondary/70">We'll reach out as soon as early access opens.</p>
              </motion.div>
            ) : (
              <>
                {/* Email field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'email' 
                        ? "inset 0 0 0 1px rgba(152, 11, 7, 0.5)" 
                        : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-transparent text-secondary placeholder-secondary/40 outline-none rounded-lg text-lg"
                    required
                  />
                  </motion.div>
                </div>

                {/* Name field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'name' 
                        ? "inset 0 0 0 1px rgba(152, 11, 7, 0.5)" 
                        : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name or artist name"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-transparent text-secondary placeholder-secondary/40 outline-none rounded-lg text-lg"
                    required
                  />
                  </motion.div>
                </div>

                {/* Phone field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'phone'
                        ? "inset 0 0 0 1px rgba(152, 11, 7, 0.5)"
                        : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number (WhatsApp)"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-transparent text-secondary placeholder-secondary/40 outline-none rounded-lg text-lg"
                    inputMode="tel"
                    required
                  />
                  </motion.div>
                </div>

                {/* Role field */}
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'role' 
                        ? "inset 0 0 0 1px rgba(152, 11, 7, 0.5)" 
                        : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('role')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-transparent text-secondary placeholder-secondary/40 outline-none rounded-lg text-lg appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled className="bg-primary text-secondary">
                      I am an... (organizer, artist, host, attendee)
                    </option>
                    <option value="organizer" className="bg-primary text-secondary">Organizer</option>
                    <option value="artist" className="bg-primary text-secondary">Artist / DJ / Performer</option>
                    <option value="host" className="bg-primary text-secondary">Venue / Host</option>
                    <option value="attendee" className="bg-primary text-secondary">Attendee</option>
                  </select>
                  </motion.div>
                </div>

                {/* Instagram field - Optional */}
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'instagram' 
                        ? "inset 0 0 0 1px rgba(152, 11, 7, 0.5)" 
                        : "inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                  <input
                    type="text"
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    placeholder="Instagram handle (optional)"
                    onFocus={() => setFocusedField('instagram')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-5 py-4 bg-transparent text-secondary placeholder-secondary/40 outline-none rounded-lg text-lg"
                  />
                  </motion.div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-5 md:py-6 px-6 bg-gradient-to-r from-[#980B07] to-accent text-primary rounded-lg font-bold text-lg md:text-xl shadow-lg relative overflow-hidden group mt-8"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(152, 11, 7, 0.8)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="relative z-10">Join the First Wave</span>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ position: "absolute", inset: 0, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "inherit" }}
                    />
                  </motion.div>
                </button>
              </>
            )}
          </form>

          {/* Disclaimer */}
          <motion.p 
            className="text-center text-xs text-secondary/50 mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            We respect your inbox. Unsubscribe anytime. Read our privacy policy.
          </motion.p>
        </motion.div>
        </div>

        {/* Tagline */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl md:text-3xl font-bold tracking-wide">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-[#980B07]">This is not an app.</span>
              </motion.div>
            </div>
            <p className="text-lg text-secondary/80 italic">
              It's a movement — led by people who care for the scene.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
