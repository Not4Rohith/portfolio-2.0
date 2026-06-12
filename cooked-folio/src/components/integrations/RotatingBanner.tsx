"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingBannerProps {
  items: {
    title: string;
    image: string;
  }[];
}

export default function RotatingBanner({
  items,
}: RotatingBannerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[index];

  return (
    <div className="absolute inset-0 ">
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 "
        >
          <Image
            src={current.image}
            alt={current.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* title overlay */}
      <div className="absolute bottom-4 right-4 z-20">
        
        <p className="text-xs uppercase tracking-widest text-white/35 font-mono text-right">
          {current.title}
        </p>
        

        {/* <h2 className="text-xl md:text-3xl font-bold text-white text-right">
          
        </h2> */}
      </div>
    </div>
  );
}