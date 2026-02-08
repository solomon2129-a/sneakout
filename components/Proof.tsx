"use client";

import { motion } from "framer-motion";

export const Proof = () => {
  const testimonials = [
    {
      quote: "Finally, something built for people who actually throw events — not corporate planners.",
      author: "Festival Organizer",
      location: "Bangalore"
    },
    {
      quote: "It just works. No bullshit, no complications.",
      author: "Music Curator",
      location: "Mumbai"
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Tested in the real world
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl hover:border-[#980B07]/50 transition-all group relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 30, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 50px rgba(255, 107, 53, 0.2)",
                }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#980B07]/0 via-[#980B07]/10 to-[#980B07]/0 group-hover:via-[#980B07]/20 rounded-2xl blur-xl transition-all duration-500 -z-10" />
                
                <div className="relative z-10">
                  <div 
                    className="mb-6 group-hover:scale-110 transition-transform"
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                    >
                  <svg className="w-8 h-8 text-[#980B07]" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    </motion.div>
                  </div>
                  <p className="text-lg text-secondary/80 mb-6 leading-relaxed group-hover:text-secondary/80 transition-colors">
                  "{testimonial.quote}"
                </p>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full bg-[#980B07]/20 border border-[#980B07]/30 group-hover:bg-[#980B07]/30"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:text-[#980B07] transition-colors">{testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
