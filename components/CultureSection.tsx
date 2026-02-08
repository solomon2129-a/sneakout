"use client";

import { motion } from "framer-motion";

export const CultureSection = () => {
  return (
    <section id="culture" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <h2 className="heading-font text-4xl md:text-5xl font-bold leading-tight mb-4">The best events don’t come from companies.<br/>They come from communities.</h2>
          <p className="text-secondary/80 mt-4 max-w-xl">Built by people who throw shows, book artists, sell records, and keep the lights on. Sneakout is for organizers, artists, venues, and vendors who treat culture like caretaking, not a product spec.</p>

          <ul className="mt-6 flex flex-col gap-2 text-secondary/80">
            <li>• Pop-up gigs</li>
            <li>• Warehouse shows</li>
            <li>• Rooftop scenes</li>
            <li>• DIY culture</li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full overflow-hidden rounded-lg"
        >
          <div className="w-full h-72 bg-gradient-to-br from-[#0B0B0B] via-[#121212] to-[#171717] rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 mix-blend-overlay opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,107,53,0.12), transparent 10%), radial-gradient(circle at 90% 80%, rgba(255,107,53,0.08), transparent 20%)' }} />
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="black" />
              <g fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1">
                <path d="M0 200 Q200 100 400 200 T800 200" />
              </g>
            </svg>
            <div className="absolute inset-0 flex items-end p-6">
              <div className="bg-black/40 px-3 py-2 rounded text-xs text-secondary/80">Pop-up gig — photo credit: local</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
