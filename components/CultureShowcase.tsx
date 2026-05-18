"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { DraggableCardContainer, DraggableCardBody } from "@/components/ui/draggable-card";
import { shuffleArray } from "@/lib/shufflePhotos";

const ITEMS_POOL = [
  {
    title: "Underground Energy",
    image: "/photos/IMG_3181.JPG",
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
  },
  {
    title: "Crowd Connection",
    image: "/photos/IMG_3189.JPG",
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  {
    title: "Late Night Culture",
    image: "/photos/IMG_3190.JPG",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
];

export const CultureShowcase = () => {
  const [items, setItems] = useState<typeof ITEMS_POOL>([]);

  useEffect(() => {
    // Shuffle items on mount
    setItems(shuffleArray(ITEMS_POOL));
  }, []);

  return (
    <section className="py-20 px-4 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5EBDD] mb-4">
              Built for Underground Culture
            </h2>
            <p className="text-lg text-[#F5EBDD]/70">
              Drag around these snapshots of the community we serve
            </p>
          </motion.div>
        </div>

        <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden glass-card">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <DraggableCardContainer className="relative w-full h-full">
            {items.map((item, i) => (
              <DraggableCardBody key={`culture-${i}`} className={item.className}>
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                  >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-80 h-64 object-cover rounded-xl"
                  />
                  <div className="bg-[#1A1A1A]/90 p-4 text-center">
                    <h3 className="text-lg font-bold text-[#F5EBDD]">
                      {item.title}
                    </h3>
                  </div>
                  </motion.div>
                </div>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
