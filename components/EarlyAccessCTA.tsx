"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Background images array for CTA section
const BACKGROUND_IMAGES = [
  "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
  "/photos/1d2dcb1400a01be837ba7962dc9722df.jpg",
  "/photos/500b54a46528c03179fad5eec6b3b4be.jpg",
  "/photos/75d02f86fd6ea6bf2eed64a13521af4f.jpg",
  "/photos/93d33b221e817388a04e6e1834d23cd7.jpg",
  "/photos/99031f2120735a3ed3062c1881698483.jpg",
  "/photos/ea0866c3d52e9c38cbd600fa1c18a2d1.jpg",
];

export const EarlyAccessCTA = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventType: "",
    instagram: "",
    eventDesc: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate images on mount
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Rotating Background with Photos */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${BACKGROUND_IMAGES[currentImageIndex]}')`,
              filter: "brightness(0.4) contrast(1.1) saturate(0.85) blur(3px)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-1" />

      {/* Vignette edge effect */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="max-w-2xl mx-auto relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              Be part of the<br />first wave
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-light">
              Sneakout launches in Bangalore in 3 months. Request early access and
              help us build the tool you've always needed.
            </p>
          </motion.div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 p-6 sm:p-8 md:p-10 bg-black/80 backdrop-blur-sm border border-red-900/30 rounded-2xl shadow-2xl"
        >
          {submitted ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    ✓
                  </motion.div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Thanks for joining
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-300">
                  We'll reach out as soon as early access opens.
                </p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-black/50 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all backdrop-blur-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-black/50 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all backdrop-blur-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-black/50 border border-red-900/20 rounded-lg text-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all backdrop-blur-sm appearance-none cursor-pointer"
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
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-black/50 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all backdrop-blur-sm"
                />
              </div>

              <textarea
                name="eventDesc"
                placeholder="Tell us about your next event (optional)"
                rows={4}
                value={form.eventDesc}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-sm sm:text-base bg-black/50 border border-red-900/20 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all resize-none backdrop-blur-sm"
              />

              <div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold rounded-lg transition-all relative overflow-hidden group shadow-lg"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 block">Request Early Access</span>
                    <div className="absolute inset-0 bg-white/20 rounded-lg">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </motion.div>
                </button>
              </div>
            </>
          )}
        </form>

        {/* Footer text */}
        <div className="text-center space-y-4 mt-8">
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
                    transition={{ duration: 0.6 }}
                  >
                    ✓
                  </motion.div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Thanks for joining
                </h3>
                <p className="text-secondary/70">
                  We'll reach out as soon as early access opens.
                </p>
              </motion.div>
            </div>
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

              <div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#980B07] hover:bg-[#980B07]/90 text-white text-lg font-bold rounded-lg transition-all relative overflow-hidden group"
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 block">Request Early Access</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ opacity: 0.2 }}
                      />
                    </div>
                  </motion.div>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
