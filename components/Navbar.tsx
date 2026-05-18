"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/20 backdrop-blur-sm border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#" className="text-secondary font-extrabold text-lg tracking-wide">Sneakout</Link>
        {/* Top navigation links removed per request */}
        <div className="flex items-center">
          {/* reserved for future actions */}
        </div>
      </div>
    </header>
  );
};
