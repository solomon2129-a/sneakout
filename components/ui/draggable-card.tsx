"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export const DraggableCardContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const DraggableCardBody = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={`cursor-grab active:cursor-grabbing ${className}`}>
      <motion.div
        ref={ref}
        drag
        dragElastic={0.2}
        dragMomentum={true}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
