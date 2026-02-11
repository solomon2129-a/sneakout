"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import type { MotionProps } from "framer-motion";
import type { HTMLAttributes } from "react";

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

type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

const MotionDiv = motion.div as (props: MotionDivProps) => JSX.Element;

export const AnimatedPhotoGrid = () => {
  const [pageIndex, setPageIndex] = useState(0);

  // chunk photos into pages of 4
  const pageSize = 4;
  const pages: string[][] = [];
  for (let i = 0; i < photos.length; i += pageSize) {
    pages.push(photos.slice(i, i + pageSize));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((p) => (p + 1) % pages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pages.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* Paged carousel container */}
      <div className="absolute inset-0">
        <MotionDiv
          className="flex w-full h-full"
          animate={{ x: `-${pageIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{ width: `${pages.length * 100}%` }}
        >
          {pages.map((page, pi) => (
            <div key={pi} className="w-full h-full flex-shrink-0 p-8">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
                {page.map((src, i) => (
                  <div key={i} className="relative w-full h-full rounded-lg overflow-hidden">
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut", delay: i * 0.06 }}
                      className="absolute inset-0"
                    >
                      <Image src={src} alt={`bg-${pi}-${i}`} fill className="object-cover hover:scale-105 transition-transform duration-700" quality={75} />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none" />
                    </MotionDiv>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </MotionDiv>
      </div>

      {/* Animated vignette effect (non interactive) */}
      <div className="absolute inset-0 pointer-events-none">
        <MotionDiv
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-black/12 via-transparent to-black/12"
        />
      </div>

      {/* Scanlines effect for cinematic feel (subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 4px)",
            backgroundSize: "100% 4px",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Reduced dark overlay for content readability to avoid black flashes */}
      <div className="absolute inset-0 bg-black/12 pointer-events-none" />
    </div>
  );
};
