"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const Compare = ({
  firstImage,
  secondImage,
  firstImageClassName = "",
  secondImageClassname = "",
  className = "",
  slideMode = "hover",
}: {
  firstImage: string;
  secondImage: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  className?: string;
  slideMode?: "hover" | "drag";
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (slideMode !== "hover" || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-lg cursor-col-resize ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={firstImage}
          alt="Before"
          className={`absolute inset-0 w-full h-full ${firstImageClassName}`}
        />
        
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={secondImage}
            alt="After"
            className={`absolute inset-0 w-full h-full ${secondImageClassname}`}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-[#FF7A00] cursor-col-resize"
          style={{
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FF7A00] rounded-full w-12 h-12 flex items-center justify-center text-[#1A1A1A] font-bold">
            ↔
          </div>
        </div>
      </motion.div>
    </div>
  );
};
