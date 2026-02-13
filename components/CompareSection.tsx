"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Compare } from "@/components/ui/compare";
import { shuffleArray } from "@/lib/shufflePhotos";

const PHOTOS_POOL = [
  "/photos/IMG_3181.JPG",
  "/photos/IMG_3182.JPG",
  "/photos/IMG_3183.JPG",
  "/photos/IMG_3184.JPG",
  "/photos/IMG_3185.JPG",
  "/photos/IMG_3186.JPG",
  "/photos/IMG_3187.JPG",
  "/photos/IMG_3188.JPG",
  "/photos/IMG_3189.JPG",
  "/photos/IMG_3190.JPG",
  "/photos/IMG_3191.JPG",
  "/photos/IMG_3192.JPG",
  "/photos/IMG_3193.JPG",
  "/photos/IMG_3194.JPG",
  "/photos/IMG_3195.JPG",
  "/photos/IMG_3197.JPG",
  "/photos/IMG_3198.JPG",
  "/photos/IMG_3199.JPG",
  "/photos/1d1210673d4cb650dba75676a4182d32.jpg",
  "/photos/1d2dcb1400a01be837ba7962dc9722df.jpg",
  "/photos/500b54a46528c03179fad5eec6b3b4be.jpg",
  "/photos/75d02f86fd6ea6bf2eed64a13521af4f.jpg",
  "/photos/93d33b221e817388a04e6e1834d23cd7.jpg",
  "/photos/99031f2120735a3ed3062c1881698483.jpg",
  "/photos/e50a13dac41cc3452647a5ae57b4701d.png",
  "/photos/ea0866c3d52e9c38cbd600fa1c18a2d1.jpg",
];

export const CompareSection = () => {
  const [firstImage, setFirstImage] = useState("/photos/IMG_3183.JPG");
  const [secondImage, setSecondImage] = useState("/photos/IMG_3184.JPG");

  useEffect(() => {
    // Pick 2 random photos from the pool
    const shuffled = shuffleArray(PHOTOS_POOL);
    setFirstImage(shuffled[0]);
    setSecondImage(shuffled[1]);
  }, []);

  return (
    <section className="py-20 px-4 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5EBDD] mb-4">
              From Chaos to Control
            </h2>
            <p className="text-lg text-[#F5EBDD]/70">
              See the difference Sneakout makes
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full max-w-2xl relative rounded-lg overflow-hidden shadow-2xl">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none rounded-lg" />
            
            <Compare
              firstImage={firstImage}
              secondImage={secondImage}
              firstImageClassName="object-cover object-center brightness-75"
              secondImageClassname="object-cover object-center brightness-85"
              className="h-[300px] md:h-[500px]"
              slideMode="hover"
            />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
