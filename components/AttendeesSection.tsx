"use client";

import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { shuffleArray } from "@/lib/shufflePhotos";

export const AttendeesSection = () => {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);

  const PHOTOS_POOL = [
    "/photos/IMG_3182.JPG",
    "/photos/IMG_3183.JPG",
    "/photos/IMG_3184.JPG",
    "/photos/IMG_3185.JPG",
    "/photos/IMG_3186.JPG",
    "/photos/IMG_3187.JPG",
    "/photos/IMG_3188.JPG",
    "/photos/IMG_3191.JPG",
    "/photos/IMG_3192.JPG",
    "/photos/IMG_3193.JPG",
    "/photos/IMG_3194.JPG",
    "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
  ];

  useEffect(() => {
    // Shuffle photos on mount
    setPhotos(shuffleArray(PHOTOS_POOL));
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const benefits = [
    { text: "Discover verified shows in your city", icon: "ticket" },
    { text: "Book with confidence - know who's host", icon: "check" },
    { text: "Support the culture, join the movement", icon: "heart" },
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
    <section ref={sectionRef} className="py-16 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#121212] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-2 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h2 className="heading-font text-3xl md:text-5xl lg:text-6xl font-bold text-secondary leading-relaxed">
                  For the ones who show up.
                </h2>
                <p className="text-base md:text-lg text-secondary/90 leading-relaxed">
                  Experience culture the way it was meant to be – direct, authentic, and intimate. Find verified shows and meet the people who make them real.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-4 mt-8">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex gap-4 w-full">
                        <div className="flex-shrink-0 w-6 h-6 text-[#980B07] mt-1">
                          {benefit.icon === 'ticket' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 18H5v-5h9v5zm4 0h-4v-5h4v5zm-9-8H5V5h9v8zm4 0v-8h4v8h-4z"/></svg>}
                          {benefit.icon === 'check' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                          {benefit.icon === 'heart' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                        </div>
                        </div>
                        <p className="text-lg text-secondary/95 leading-relaxed">
                          {benefit.text}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Image placeholder */}
          <div className="w-full order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ scale: imageScale }}
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-black/40 to-black/20 rounded-2xl overflow-hidden shadow-2xl">
                {/* Animated photo grid */}
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
                          alt="Crowd and concert photo"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#980B07]/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
