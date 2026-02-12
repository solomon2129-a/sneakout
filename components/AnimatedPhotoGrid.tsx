"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const MotionDiv: any = motion.div;

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

export const AnimatedPhotoGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-rotate through photos
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* Main carousel container */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="relative w-full h-full max-w-4xl max-h-[600px] rounded-xl overflow-hidden shadow-2xl">
          {/* Carousel images */}
          <div className="relative w-full h-full">
            {photos.map((src, i) => (
              <MotionDiv
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: i === selectedIndex ? 1 : 0,
                  scale: i === selectedIndex ? 1 : 0.95,
                  zIndex: i === selectedIndex ? 10 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Image
                  src={src}
                  alt={`Real moment ${i + 1}`}
                  fill
                  className="object-cover"
                  quality={85}
                  priority={i === selectedIndex}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </MotionDiv>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
            {photos.map((_, i) => (
              <MotionDiv
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className={`rounded-full transition-all ${
                    i === selectedIndex
                      ? "bg-red-500 w-3 h-3 sm:w-4 sm:h-4"
                      : "bg-white/40 hover:bg-white/60 w-2 h-2 sm:w-3 sm:h-3"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              </MotionDiv>
            ))}
          </div>

          {/* Arrow navigation */}
          <button
            onClick={() => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition-all"
            aria-label="Previous photo"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setSelectedIndex((prev) => (prev + 1) % photos.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-red-600 text-white p-2 sm:p-3 rounded-full transition-all"
            aria-label="Next photo"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Photo counter */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-white text-xs sm:text-sm font-semibold bg-black/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      </div>

      {/* Animated background bloom */}
      <MotionDiv
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 70%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dark vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  );
};
