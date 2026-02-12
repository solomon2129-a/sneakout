"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export const ProofSection = () => {
  const stats = [
    { value: '6+', label: 'live events', icon: 'circus' },
    { value: '₹42L+', label: 'in community-run experiences', icon: 'wallet' },
    { value: 'Bengaluru', label: 'Built with organizers here', icon: 'cityscape' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="proof" className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-primary to-[#0A0A0A]">
    <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <motion.div className="grid grid-cols-1 gap-12 mb-20" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <motion.div
                variants={statVariants}
              >
              <div className="space-y-6">
                {/* Icon with bounce */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 text-[#980B07]">
                    <motion.div
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
                      style={{ width: "100%", height: "100%" }}
                    >
                      {stat.icon === 'circus' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>}
                      {stat.icon === 'wallet' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18 6h-2c0-2.66-2.24-4.75-5-4.75S6 3.34 6 6H4c-1.1 0-1.99.9-1.99 2L2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 9c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>}
                      {stat.icon === 'cityscape' && <svg fill="currentColor" viewBox="0 0 24 24"><path d="M15 11V5h4v6h5v6h-2v8h-3v-8h-2v8h-3v-8h-2v8H8v-8H6v-6h5v6h4zm-8-6v6H3v6h2v8h3v-8h2v8h3v-8h2v-6H7V5H4z"/></svg>}
                    </motion.div>
                  </div>
                </div>

                {/* Stat value */}
                <h3 className="text-6xl md:text-7xl font-black bg-gradient-to-br from-[#980B07] via-accent to-[#E5E5E5] bg-clip-text text-transparent leading-tight">
                  {stat.value}
                </h3>

                {/* Label */}
                <div className="text-lg text-secondary/80 leading-relaxed">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Quote */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl text-secondary/90 leading-relaxed italic font-light">
              "Finally, something built for people who actually throw events."
            </p>
          </motion.blockquote>
        </div>

        {/* Event photos (use provided photos) */}
        <div className="mt-16 pt-16 border-t border-[#1A1A1A]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-center text-sm text-secondary/60 mb-8 uppercase tracking-widest">Real moments from real events</p>
            <PhotoGrid />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PhotoGrid = () => {
  const photos = [
    "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
    "/photos/500b54a46528c03179fad5eec6b3b4be.jpg",
    "/photos/75d02f86fd6ea6bf2eed64a13521af4f.jpg",
    "/photos/93d33b221e817388a04e6e1834d23cd7.jpg",
    "/photos/99031f2120735a3ed3062c1881698483.jpg",
    "/photos/e50a13dac41cc3452647a5ae57b4701d.png",
    "/photos/ea0866c3d52e9c38cbd600fa1c18a2d1.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [photosPerView, setPhotosPerView] = useState(3);

  // Handle responsive layout after mount
  useEffect(() => {
    const handleResize = () => {
      setPhotosPerView(window.innerWidth < 768 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visiblePhotos = photos.slice(currentIndex, currentIndex + photosPerView);
  const hasMore = currentIndex + photosPerView < photos.length;

  const nextPhotos = () => {
    if (hasMore) {
      setCurrentIndex((prev) => Math.min(prev + 1, photos.length - photosPerView));
    }
  };

  const prevPhotos = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div>
      <div className="relative px-2 sm:px-4">
        {/* Photo display grid - 3 on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {visiblePhotos.map((src, idx) => (
            <motion.button
              key={currentIndex + idx}
              onClick={() => setSelected(src)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-xl overflow-hidden border border-[#1A1A1A] bg-black transform-gpu hover:scale-105 transition-transform duration-300 focus:outline-none"
            >
              <Image src={src} alt={`event-${currentIndex + idx}`} fill className="object-cover" quality={80} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </motion.button>
          ))}
        </div>

        {/* Arrow Navigation */}
        {photos.length > photosPerView && (
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-2 sm:px-0 gap-2 sm:gap-4">
            <motion.button
              onClick={prevPhotos}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 rounded-full border border-[#1A1A1A] bg-black hover:border-red-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 text-slate-400 hover:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Counter */}
            <div className="text-center text-xs sm:text-sm text-slate-400 flex-shrink-0">
              <span className="text-red-400 font-semibold">{currentIndex + 1}</span>
              <span className="opacity-60"> - </span>
              <span className="text-red-400 font-semibold">{Math.min(currentIndex + photosPerView, photos.length)}</span>
              <span className="opacity-60"> / {photos.length}</span>
            </div>

            <motion.button
              onClick={nextPhotos}
              disabled={!hasMore}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 rounded-full border border-[#1A1A1A] bg-black hover:border-red-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 text-slate-400 hover:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-[90%] max-w-4xl h-[80%]">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-50 bg-black/40 text-secondary p-2 rounded-full"
            >
              ✕
            </button>
            <Image src={selected} alt="selected" fill className="object-contain" quality={90} />
          </div>
        </div>
      )}
    </div>
  );
};
