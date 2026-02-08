"use client";

import { motion } from "framer-motion";
import { DraggableCardContainer, DraggableCardBody } from "@/components/ui/draggable-card";

const items = [
  {
    title: "Underground Energy",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=320&fit=crop",
    className: "absolute top-10 left-[20%] rotate-[-5deg]",
  },
  {
    title: "Crowd Connection",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=320&fit=crop",
    className: "absolute top-40 left-[25%] rotate-[-7deg]",
  },
  {
    title: "Late Night Culture",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&h=320&fit=crop",
    className: "absolute top-5 left-[40%] rotate-[8deg]",
  },
];

export const CultureShowcase = () => {
  return (
    <section className="py-20 px-4 bg-[#1A1A1A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5EBDD] mb-4">
            Built for Underground Culture
          </h2>
          <p className="text-lg text-[#F5EBDD]/70">
            Drag around these snapshots of the community we serve
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden glass-card"
        >
          <DraggableCardContainer className="relative w-full h-full">
            {items.map((item, i) => (
              <DraggableCardBody key={`culture-${i}`} className={item.className}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-xl"
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
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </motion.div>
      </div>
    </section>
  );
};
