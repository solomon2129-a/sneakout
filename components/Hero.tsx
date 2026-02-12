"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Background images from local photos folder
const BACKGROUND_IMAGES = [
  "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
  "/photos/1d2dcb1400a01be837ba7962dc9722df.jpg",
  "/photos/500b54a46528c03179fad5eec6b3b4be.jpg",
  "/photos/75d02f86fd6ea6bf2eed64a13521af4f.jpg",
  "/photos/93d33b221e817388a04e6e1834d23cd7.jpg",
  "/photos/99031f2120735a3ed3062c1881698483.jpg",
  "/photos/ea0866c3d52e9c38cbd600fa1c18a2d1.jpg",
];

const ROTATION_INTERVAL = 5000; // 5 seconds

export const Hero = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  // Check for reduced motion preference first (before effects)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Track mouse position for interactive glow
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Preload images
  useEffect(() => {
    BACKGROUND_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Rotate background images
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const kenBurnsVariants = {
    initial: { scale: 1 },
    animate: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: {
        duration: ROTATION_INTERVAL / 1000,
        ease: "linear",
      },
    },
  };

  return (
    <>
      {/* MAIN HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Top left logo - clickable for admin login */}
        <motion.button
          onClick={() => router.push("/admin-login")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="absolute top-4 left-4 z-40 w-8 h-8 sm:top-6 sm:left-6 sm:w-10 sm:h-10 md:w-16 md:h-16 cursor-pointer transition-opacity duration-300 hover:opacity-80 focus:outline-none"
          aria-label="Admin login"
        >
          <img
            src="/photos/assets/logo.png"
            alt="Sneakout Logo"
            className="w-full h-full object-contain"
          />
        </motion.button>
        {/* BACKGROUND LAYER: Rotating image with Ken Burns effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${BACKGROUND_IMAGES[currentImageIndex]}')`,
                filter: "brightness(0.65) contrast(1.1) saturate(0.9)",
              }}
              variants={kenBurnsVariants}
              initial="initial"
              animate="animate"
            />
          </motion.div>
        </AnimatePresence>

        {/* Interactive cursor glow - follows mouse */}
        {!prefersReducedMotion && isHovering && (
          <motion.div
            className="absolute z-5 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)",
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            animate={{
              opacity: isHovering ? 0.8 : 0.3,
            }}
            transition={{ type: "spring", stiffness: 30, damping: 20 }}
          />
        )}

        {/* Light leak overlay - subtle radial gradient */}
        <div className="absolute inset-0 z-1 pointer-events-none opacity-15">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, rgba(220, 80, 40, 0.2) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Floating particles/dust effect */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                animate={{
                  y: [0, -600],
                  opacity: [0, 0.6, 0],
                  x: Math.sin(i * 0.5) * 100,
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                style={{
                  left: `${(i / 12) * 100}%`,
                  bottom: "-10px",
                }}
              />
            ))}
          </div>
        )}

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 result=%22noise%22 /%3E%3CfeColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-20 text-center px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 sm:space-y-3 md:space-y-4"
          >
            {/* Main headline - image instead of text */}
            <motion.div variants={itemVariants}>
              <div className="relative w-full max-w-xs h-24 sm:max-w-sm sm:h-32 md:max-w-2xl md:h-56 lg:h-72 flex items-center justify-center">
                <img
                  src="/photos/assets/text.png"
                  alt="SNEAKOUT"
                  className="max-w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.div
              variants={itemVariants}
              className="cursor-pointer"
              whileHover={
                prefersReducedMotion ? {} : { scale: 1.02, x: 5 }
              }
            >
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-slate-200 font-light tracking-wide max-w-xl sm:max-w-2xl mx-auto leading-relaxed opacity-85">
                Where underground culture gets organized.
              </p>
            </motion.div>



            {/* CTA Link - Minimal style */}
            <motion.div variants={itemVariants} className="pt-8">
              <motion.a
                href="#join"
                className="inline-flex items-center justify-center"
                whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <span className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 font-light tracking-wide hover:text-red-400 transition-colors duration-300">
                  Enter the Scene
                  {!prefersReducedMotion && (
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          <button
            onClick={() => {
              const element = document.getElementById("culture");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1 sm:gap-2 text-slate-400 hover:text-slate-200 transition-colors duration-300 cursor-pointer group"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-75 group-hover:opacity-100">
              Scroll
            </span>
            <motion.div
              animate={
                prefersReducedMotion
                  ? { opacity: 0.7 }
                  : { opacity: [0.5, 1, 0.5] }
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg
                className="w-3 h-3 sm:w-5 sm:h-5 group-hover:text-red-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </button>
        </motion.div>

        {/* Vignette edges */}
        <div className="absolute inset-0 z-25 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
            }}
          />
        </div>
      </section>
    </>
  );
};