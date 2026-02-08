"use client";

import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/20 backdrop-blur-sm border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#" className="text-secondary font-extrabold text-lg tracking-wide">Sneakout</Link>
        <nav className="hidden sm:flex gap-6 items-center text-sm text-secondary/90">
          <a href="#culture" className="hover:text-secondary">Culture</a>
          <a href="#chaos" className="hover:text-secondary">Reality</a>
          <a href="#role" className="hover:text-secondary">Role</a>
          <a href="#join" className="hover:text-secondary border border-transparent px-3 py-1 rounded-full hover:bg-accent/10">Join</a>
        </nav>
      </div>
    </header>
  );
};
