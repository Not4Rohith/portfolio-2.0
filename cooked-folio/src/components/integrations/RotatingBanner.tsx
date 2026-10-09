"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingBannerProps {
  items: {
    title: string;
    image: string;
  }[];
}

export default function RotatingBanner({ items }: RotatingBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="absolute inset-0 bg-black">
      {/* 1. Map through ALL images to keep them in the DOM for preloading */}
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          // Prevent hidden images from capturing clicks
          style={{ pointerEvents: i === index ? "auto" : "none" }} 
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            // 2. Only prioritize the very first image for performance
            priority={i === 0} 
            className="object-cover"
          />
        </motion.div>
      ))}

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/35 z-10" />

      {/* title overlay */}
      <div className="absolute bottom-4 right-4 z-20">
        {/* 3. We can still use AnimatePresence for the text so it transitions smoothly */}
        <AnimatePresence mode="wait">
          <motion.p
            key={items[index].title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-xs uppercase tracking-widest text-white/35 font-mono text-right"
          >
            {items[index].title}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}