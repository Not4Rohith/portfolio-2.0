"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CURRENTLY_WATCHING } from "@/lib/config";

export function CurrentlyWatching() {
  return (
    <section className="mb-6">
      <h2 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-wider">
        currently watching
      </h2>

      <div className="flex gap-3 overflow-x-auto">
        {CURRENTLY_WATCHING.map((item) => (
          <motion.a
            key={item.title}
            href={item.link}
            target="_blank"
            whileHover={{
              y: -3,
            }}
            className="group shrink-0"
          >
            <div className="relative w-20 h-28 overflow-hidden rounded-xl border border-border">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="mt-2 text-[11px] text-center text-muted-foreground max-w-[80px] line-clamp-2">
              {item.title}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}