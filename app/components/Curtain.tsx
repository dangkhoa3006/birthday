"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Curtain() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open curtain after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Left curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-black via-gray-900 to-black"
          />

          {/* Right curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black via-gray-900 to-black"
          />
        </div>
      )}
    </AnimatePresence>
  );
}

