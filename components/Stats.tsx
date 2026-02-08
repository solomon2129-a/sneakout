"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const stats = [
    { label: "Live Events", value: 6, suffix: "+" },
    { label: "Events Coordinated", value: 42, prefix: "₹", suffix: "L" },
    { label: "Organizers Served", value: 200, suffix: "+" },
    { label: "Cities Covered", value: 3, suffix: "" },
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0A0A] border-y border-[#2A2A2A] relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#980B07] via-transparent to-[#980B07]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Tested in the real world
          </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div className="text-center group cursor-default">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
              <div className="text-5xl md:text-6xl font-black text-[#980B07] mb-3 group-hover:scale-110 transition-transform">
                <motion.div
                  whileHover={{ textShadow: "0 0 20px rgba(255, 107, 53, 0.5)" }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </motion.div>
              </div>
              <p className="text-secondary/70 text-lg group-hover:text-secondary/80 transition-colors">{stat.label}</p>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
