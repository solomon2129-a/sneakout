"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const AnimatedPhotoGrid = ({ pages }: { pages: React.ReactNode[] }) => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${pageIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{ width: `${pages.length * 100}%` }}
        >
          {pages.map((page, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              {page}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
