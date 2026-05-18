"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", url: "https://www.instagram.com/sneakout.co/", icon: "instagram" },
    { name: "Twitter", url: "#", icon: "twitter" },
  ];

  return (
    <footer className="py-20 px-6 bg-black border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-16 mb-16">
          {/* Left: Brand & Tagline */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
            <h3 className="heading-font text-3xl font-bold text-secondary">Sneakout</h3>
            <p className="text-sm text-secondary/70 leading-relaxed max-w-sm">
              © {currentYear} Sneakout – where underground culture meets trust.
            </p>
            </motion.div>
          </div>

          {/* Center: Social Links */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
            <p className="text-sm font-semibold text-secondary/80 uppercase tracking-widest">Follow</p>
            <div className="flex gap-6">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="group">
                  <div className="w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center text-lg text-secondary/60 group-hover:text-[#980B07] group-hover:border-[#980B07]/50 transition-all duration-300">
                    <div className="w-6 h-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        style={{ width: "100%", height: "100%" }}
                      >
                        {social.icon === 'instagram' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/></svg>}
                        {social.icon === 'twitter' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9.5 5M21 20.5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>}
                      </motion.div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            </motion.div>
          </div>

          {/* Right: Contact */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
            <p className="text-sm font-semibold text-secondary/80 uppercase tracking-widest">Contact</p>
            <motion.a 
              href="mailto:samuel@sneakout.com" 
              className="inline-block text-secondary/70 hover:text-[#980B07] transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              samuel@sneakout.com
            </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1A1A1A]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </div>

        {/* Bottom: Copyright & Legal */}
        <motion.div
          className="pt-8 text-center md:text-left flex flex-col md:flex-col md:justify-between md:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-secondary/50 leading-relaxed">
            Made by the community, for the community.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6 justify-center md:justify-end text-xs text-secondary/50">
            <a href="#" className="hover:text-secondary/80 transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary/80 transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary/80 transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

