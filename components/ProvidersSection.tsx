"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export const ProvidersSection = () => {
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

  const benefits = [
    { text: "Get discovered by trusted hosts", icon: "target" },
    { text: "Protect your money & reputation", icon: "shield" },
    { text: "Build your underground following", icon: "trending" },
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

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#980B07] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/3 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Animated Photo Grid */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, x: -60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden shadow-2xl">
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
                          alt="DJ and vendor photo"
                          fill
                          className="object-cover"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
                      </motion.div>
                    </div>
                  ))}
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#980B07]/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right: Text content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h2 className="heading-font text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-relaxed">
                  For the ones who build the scene.
                </h2>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Artists, DJs, vendors, hosts – this is your platform. Show your work, get discovered, and build trust with the community.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 text-white mt-1">
                        <motion.div variants={itemVariants} whileHover={{ x: 8 }} transition={{ duration: 0.3 }} style={{ width: "100%", height: "100%" }}>
                          {benefit.icon === 'target' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c-2.33 0-4.31-1.46-5.11-3.5H15.11c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>}
                          {benefit.icon === 'shield' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.72-7 8.77V12H5V6.3l7-3.11v8.8z"/></svg>}
                          {benefit.icon === 'trending' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 9 12.41l4 4 6.3-6.29L16 12h6V6z"/></svg>}
                        </motion.div>
                      </div>
                      <p className="text-lg text-white/95 leading-relaxed">{benefit.text}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
