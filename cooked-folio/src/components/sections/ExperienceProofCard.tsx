"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceProofCardProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  role: string;
  proofs: string[];
}

export function ExperienceProofCard({
  isOpen,
  onClose,
  company,
  role,
  proofs,
}: ExperienceProofCardProps) {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client.
  useEffect(() => setMounted(true), []);

  // Always start from the first photo whenever the card opens.
  useEffect(() => {
    if (isOpen) setCurrent(0);
  }, [isOpen, company]);

  // Lock body scroll while the card is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Support Escape key to close.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const goNext = () => setCurrent((c) => (c + 1) % proofs.length);
  const goPrev = () => setCurrent((c) => (c - 1 + proofs.length) % proofs.length);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop — darkens the entire viewport when the card is open */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Card — perfectly centered within the viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[720px] max-h-[90vh] overflow-hidden flex flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border/50 bg-card/90 backdrop-blur-md">
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  work proof
                </p>
                <h3 className="font-medium text-foreground leading-tight">{company}</h3>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-10 h-10 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center text-muted-foreground"
                aria-label="Close proof card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gallery body */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              {/* Main image area — the whole image is always shown (object-contain) */}
              <div className="flex-1 min-h-0 relative bg-black/50 flex items-center justify-center p-4 sm:p-8">
                <div className="relative w-full h-[45vh] sm:h-[52vh] max-h-[560px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={proofs[current]}
                        alt={`${company} — work proof ${current + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left / right arrow navigation */}
                {proofs.length > 1 && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-xl backdrop-blur-sm"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background/90 border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-xl backdrop-blur-sm"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Photo counter */}
                {proofs.length > 1 && (
                  <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 border border-border text-xs font-mono text-muted-foreground backdrop-blur-sm">
                    <span>{current + 1}</span>
                    <span className="mx-0.5 opacity-60">/</span>
                    <span>{proofs.length}</span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip — all proofs laid out left to right */}
              {proofs.length > 1 && (
                <div className="h-16 shrink-0 border-t border-border/50 bg-card/60 backdrop-blur-md px-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {proofs.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Show photo ${i + 1}`}
                      className={cn(
                        "relative shrink-0 w-12 h-12 rounded-lg border overflow-hidden transition-all duration-200",
                        i === current
                          ? "border-primary ring-2 ring-primary ring-offset-1 ring-offset-card"
                          : "border-border/50 hover:border-border/80 opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={src}
                        alt={`proof thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
