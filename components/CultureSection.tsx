"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export const CultureSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
    "/photos/1d2dcb1400a01be837ba7962dc9722df.jpg",
    "/photos/500b54a46528c03179fad5eec6b3b4be.jpg",
    "/photos/75d02f86fd6ea6bf2eed64a13521af4f.jpg",
    "/photos/93d33b221e817388a04e6e1834d23cd7.jpg",
    "/photos/99031f2120735a3ed3062c1881698483.jpg",
    "/photos/e50a13dac41cc3452647a5ae57b4701d.png",
    "/photos/ea0866c3d52e9c38cbd600fa1c18a2d1.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const culturalItems = [
    { label: "Pop-up gigs", icon: "mic" },
    { label: "Warehouse shows", icon: "building" },
    { label: "Rooftop scenes", icon: "home" },
    { label: "DIY culture", icon: "palette" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section id="culture" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2 items-start">
          {/* Left column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 md:space-y-8">
              <h2 className="heading-font text-3xl md:text-5xl lg:text-6xl font-bold leading-relaxed mb-6 text-secondary">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  The best events don't come from companies. They come from communities.
                </motion.div>
              </h2>
              
              <p className="text-base md:text-lg text-secondary/80 leading-relaxed max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Built by people who throw shows, book artists, sell records, and keep the lights on. Sneakout is for organizers, artists, venues, and vendors who treat culture like caretaking, not a product spec.
                </motion.div>
              </p>
            </div>

            {/* Visual cards grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                {culturalItems.map((item, i) => {
                  const iconSVG = {
                    mic: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.5 14.56 16 12 16s-4.52-1.5-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3.41 3.85 5.86 7.91 5.86s7.42-2.45 7.91-5.86c.1-.6-.39-1.14-1-1.14z"/></svg>,
                    building: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
                    home: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
                    palette: <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.5 9c1.1 0 2-1.34 2-3s-.9-3-2-3-2 1.34-2 3 .9 3 2 3zm4.5-2c.83 0 1.5-.67 1.5-1.5S11.83 6 11 6s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm4.5 2c1.1 0 2-1.34 2-3s-.9-3-2-3-2 1.34-2 3 .9 3 2 3zm-1.5 7.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
                  };

                  return (
                    <div key={i} className="p-4 sm:p-6 bg-black/40 border border-white/10 rounded-lg cursor-pointer hover:border-white/30 transition-all duration-300">
                      <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -4 }}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex justify-center">
                            {iconSVG[item.icon]}
                          </div>
                          <p className="text-secondary font-semibold text-xs sm:text-sm text-center leading-snug">{item.label}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
            </motion.div>
          </motion.div>

          {/* Right column - Image with animated photo grid */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: 20 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-2xl overflow-hidden shadow-2xl">
                <motion.div
                  whileHover={{ boxShadow: "0 30px 80px rgba(152, 11, 7, 0.3)" }}
                >
                  {/* Animated photo grid */}
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      {[currentIndex % photos.length].map((photoIndex) => (
                        <div key={currentIndex} className="absolute inset-0">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ width: "100%", height: "100%" }}
                          >
                            <Image
                              src={photos[photoIndex]}
                              alt="Community event photo"
                              fill
                              className="object-cover"
                              quality={80}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
                          </motion.div>
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#980B07]/10 via-transparent to-transparent" />
                  
                  {/* Image credit */}
                  <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-xs text-secondary/70">Community-driven culture</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
