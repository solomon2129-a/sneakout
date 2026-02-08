"use client";

import { motion } from "framer-motion";
import { Compare } from "@/components/ui/compare";

export const CompareSection = () => {
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
              firstImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=500&fit=crop&auto=format"
              secondImage="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=500&fit=crop&auto=format"
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
