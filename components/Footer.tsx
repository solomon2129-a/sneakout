"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-primary border-t border-[#141414]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-8 text-secondary/70 hover:text-secondary transition-colors cursor-default">
            © 2026 Sneakout. Event infrastructure built for underground culture.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Founders */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Founders</p>
              <div className="space-y-2">
                <motion.a
                  href="https://www.linkedin.com/in/samuel-john-paul-b14193260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: "#980B07" }}
                  className="block text-[#980B07] hover:text-[#980B07]/80 transition-colors"
                >
                  Samuel John Paul
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/solomonjohnpaul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5, color: "#980B07" }}
                  className="block text-[#980B07] hover:text-[#980B07]/80 transition-colors"
                >
                  Solomon John Paul
                </motion.a>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Follow</p>
              <motion.a
                href="https://www.instagram.com/sneakout.co/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#980B07" }}
                className="inline-block text-[#980B07] hover:text-[#980B07]/80 transition-colors"
              >
                Instagram
              </motion.a>
            </motion.div>

            {/* Links */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-secondary/70 mb-3 font-semibold">Connect</p>
              <div className="space-y-2">
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#980B07" }}
                  className="block text-secondary/70 hover:text-[#980B07] transition-colors text-sm"
                >
                  Twitter
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, color: "#980B07" }}
                  className="block text-secondary/70 hover:text-[#980B07] transition-colors text-sm"
                >
                  Email
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="border-t border-[#141414] pt-8"
            whileHover={{ borderColor: "rgba(152,11,7,0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-secondary/70">
              Made by the community, for the community.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
