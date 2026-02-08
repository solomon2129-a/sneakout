"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export const TiltCard = ({ title, description, icon, index }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl hover:border-[#980B07]/50 transition-all duration-300 h-full overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Enhanced glowing background on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-[#980B07]/20 to-[#980B07]/5 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10">
          <motion.div 
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10">
          <div className="w-16 h-16 bg-[#980B07]/10 border border-[#980B07]/20 rounded-xl flex items-center justify-center mb-6 transform transition-all duration-300 text-2xl">
            <motion.div 
              whileHover={{ 
                backgroundColor: "rgba(255, 107, 53, 0.2)",
                boxShadow: "0 0 20px rgba(255, 107, 53, 0.3)",
              }}
            >
              {icon}
            </motion.div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#980B07] transition-colors">{title}</h3>
          <p className="text-secondary/70 group-hover:text-secondary/80 transition-colors leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: "📋",
      title: "Plan with Structure",
      description:
        "Turn ideas into action. Set timelines, track tasks, and stay organized from concept to execution.",
    },
    {
      icon: "⚡",
      title: "Execute with Confidence",
      description:
        "Everything you need to run the event — confirmations, logistics, and real-time coordination.",
    },
    {
      icon: "🏆",
      title: "Build Your Reputation",
      description:
        "Every successful event builds your credibility. Show the scene you're reliable.",
    },
  ];

  return (
    <section className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden border-b border-[#2A2A2A]">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#980B07] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#980B07] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              One tool. Less chaos.<br />Better events.
            </h2>
            <p className="text-xl text-secondary/70 max-w-2xl mx-auto">
              Sneakout brings order to the beautiful chaos of event organizing.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <TiltCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
