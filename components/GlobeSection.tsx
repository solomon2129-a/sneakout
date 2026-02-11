"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export const GlobeSection = () => {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1A1A1A",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#1A1A1A",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#980B07",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 12.9716, lng: 77.5946 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <section className="py-20 px-4 bg-[#1A1A1A] relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#F5EBDD] mb-4">
              Underground culture is global
            </h2>

            <p className="text-lg text-[#F5EBDD]/70 max-w-md mx-auto">
              Sneakout helps scenes grow beyond cities.
            </p>
          </motion.div>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden glass-card">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <World globeConfig={globeConfig} data={[]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
