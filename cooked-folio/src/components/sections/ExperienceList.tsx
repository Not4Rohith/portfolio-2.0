"use client";

import { EXPERIENCE } from "@/lib/config";
import { staggerContainer, staggerItem, viewport } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExperienceProofCard } from "./ExperienceProofCard";

export function ExperienceList() {
  const [isProofOpen, setIsProofOpen] = useState(false);
  const [selectedProofs, setSelectedProofs] = useState<{ company: string; role: string; proofs: string[] } | null>(
    null
  );

  const openProofs = (job: (typeof EXPERIENCE)[number]) => {
    if (!job.proofs?.length) return;
    setSelectedProofs({
      company: job.company,
      role: job.role,
      proofs: job.proofs,
    });
    setIsProofOpen(true);
  };

  return (
    <section className="mb-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.h2
          variants={staggerItem}
          className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wider pl-1 md:pl-0"
        >
          // experience
        </motion.h2>

        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{
                x: 4,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onClick={() => openProofs(job)}
              className={cn(
                "grid grid-cols-1 md:grid-cols-[100px_1fr] gap-y-2 gap-x-4 items-start rounded-lg p-2 -m-2 transition-colors duration-200 cursor-pointer select-none",
                job.proofs?.length ? "hover:bg-primary/[0.03]" : "hover:bg-transparent"
              )}
            >
              {job.proofs?.length && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] text-primary transition-opacity group-hover:opacity-100 opacity-70">
                  📷
                </div>
              )}
              <div className="text-xs font-mono text-muted-foreground pt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                {job.date}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-foreground text-sm md:text-base flex flex-wrap items-center gap-x-2">
                  <span>{job.role}</span>
                  <span className="text-muted-foreground text-xs">at</span>

                  <span className="inline-flex items-center gap-2 text-foreground font-semibold">
                    <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {job.company}
                  </span>
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {job.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ExperienceProofCard
        isOpen={isProofOpen}
        onClose={() => {
          setIsProofOpen(false);
          setSelectedProofs(null);
        }}
        company={selectedProofs?.company ?? ""}
        role={selectedProofs?.role ?? ""}
        proofs={selectedProofs?.proofs ?? []}
      />
    </section>
  );
}
