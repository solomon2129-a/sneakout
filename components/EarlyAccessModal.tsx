"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EarlyAccessModal - Airtable form embed in a modal
 * 
 * Important:
 * - The iframe is rendered directly without React form handling
 * - Modal stays open until user closes it (Airtable handles form submission)
 * - Iframe is always mounted when modal is open (prevents resubmission issues)
 * - No click handlers on the iframe element
 */
export const EarlyAccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on overlay, not on modal content
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#980B07] to-accent text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
      >
        Join Early Access
      </motion.button>

      {/* Modal Portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Background Overlay - Click to close */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleOverlayClick}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              aria-label="Close modal"
            />

            {/* Modal Container - Stays mounted during form submission */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
            >
              <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-[#2A2A2A]">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Join the First Wave
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-secondary/60 hover:text-secondary transition-colors p-2 flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </motion.button>
                </div>

                {/* Iframe Container - Plain div, no form wrapper */}
                <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] p-6 md:p-8">
                  {/* 
                    Airtable embed iframe
                    - Using official Airtable embed class for proper styling
                    - No onClick handlers or interference
                    - Always mounted when modal is open
                    - Airtable handles all form logic and submission
                    - Sandbox allows form submission to Airtable servers
                  */}
                  <iframe
                    className="airtable-embed"
                    src="https://airtable.com/embed/appKus0bCaH3JbtgW/pagt3jigwW7Okwodr/form"
                    frameBorder="0"
                    width="100%"
                    height="533"
                    style={{
                      background: "transparent",
                      border: "1px solid #2A2A2A",
                    }}
                    sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
                    title="Sneakout Early Access Form"
                  />
                </div>

                {/* Footer Text */}
                <div className="px-6 md:px-8 py-4 border-t border-[#2A2A2A] text-center text-xs text-secondary/50">
                  We respect your inbox. Unsubscribe anytime.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
