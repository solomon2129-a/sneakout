"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-primary border-t border-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-8 text-secondary/70 hover:text-secondary transition-colors cursor-default">
              © 2026 Sneakout. Event infrastructure built for underground culture.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Contact</p>
              <div className="space-y-2">
                <a
                  href="mailto:samuel@sneakout.com"
                  className="block text-[#980B07] hover:text-[#980B07]/80 transition-colors"
                >
                  <motion.div whileHover={{ x: 5 }}>
                    samuel@sneakout.com
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Social */}
          <div>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Follow</p>
              <a
                href="https://www.instagram.com/sneakout.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#980B07] hover:text-[#980B07]/80 transition-colors"
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  Instagram
                </motion.div>
              </a>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Connect</p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-secondary/70 hover:text-[#980B07] transition-colors text-sm"
                >
                  <motion.div whileHover={{ x: 5 }}>
                    Twitter
                  </motion.div>
                </a>
                <a
                  href="#"
                  className="block text-secondary/70 hover:text-[#980B07] transition-colors text-sm"
                >
                  <motion.div whileHover={{ x: 5 }}>
                    Email
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-[#141414] pt-8">
          <motion.div
            whileHover={{ borderColor: "rgba(152,11,7,0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-secondary/70">
              Made by the community, for the community.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

