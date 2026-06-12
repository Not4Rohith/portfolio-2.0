"use client";

import { CAL_URL } from "@/lib/config";
import { getCalApi } from "@calcom/embed-react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Paperclip, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGithub, SiInstagram, SiLinkedin, SiX, SiDiscord } from "react-icons/si";
//
import { DISCORD_LINK, SOCIALS } from "@/lib/config";

export function Footer() {
  const [isCalLoading, setIsCalLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "notrohith44@gmail.com";

  const staggerChild = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });

      cal("on", {
        action: "linkReady",
        callback: () => {
          setTimeout(() => setIsCalLoading(false), 800);
        },
      });
    })();
  }, []);

  const calLink = CAL_URL.replace(/^https?:\/\/(www\.)?cal\.com\//, "");

  useEffect(() => {
    if (isCalLoading) {
      const timer = setTimeout(() => setIsCalLoading(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isCalLoading]);

  return (
    <>
      <AnimatePresence>
        {isCalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="relative w-16 h-16"
            >
              <Image
                src="/avatar/avatar.png"
                alt="loading..."
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer id="footer" className="mt-12 pb-8 pt-8 border-t border-border/40 text-sm text-muted-foreground font-mono">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="space-y-2"
          >
            <h3 className="text-foreground font-medium text-base tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground/80 max-w-md leading-relaxed">
              contact me, don't be shy
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.08 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <motion.button
              onClick={() => setIsCalLoading(true)}
              data-cal-link={calLink}
              data-cal-config='{"layout":"month_view","hideEventTypeDetails":true}'
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
              className="
                group relative flex items-center overflow-hidden
                h-12 pl-2 pr-5 w-fit
                bg-card hover:bg-primary/5
                border border-border hover:border-primary/50
                rounded-lg
                transition-all duration-300
                cursor-pointer
                shadow-sm
              "
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md mr-3">
                <Image
                  src="/avatar/avatar.png"
                  alt="Rohith N R"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
                <Image
                  src="/avatar/avatar-full1.png"
                  alt="Rohith N R"
                  width={60}
                  height={60}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
              </div>

              <div className="flex items-center">
                <motion.div
                  variants={{
                    initial: { width: 0, opacity: 0, marginRight: 0 },
                    hover: { width: "auto", opacity: 1, marginRight: 8 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 text-primary" />
                  <div className="h-5 px-1.5 rounded-sm bg-background border border-border flex items-center justify-center">
                    <span className="text-[10px] font-medium text-foreground">
                      You
                    </span>
                  </div>
                </motion.div>
                <span className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors">
                  Book a call
                </span>
              </div>
            </motion.button>

            <motion.div
              whileHover={{ x: 3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            >
              
            </motion.div>
          </motion.div>
          
          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-5">
                      {SOCIALS.map((social) => (
                        <motion.a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platform}
                          className="text-muted-foreground transition-all duration-200"
                          whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget.firstElementChild as HTMLElement;
                            if (el && (social as any).color)
                              el.style.color = (social as any).color;
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget.firstElementChild as HTMLElement;
                            if (el) el.style.color = "";
                          }}
                        >
                          <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.a>
                      ))}
          
                      <div className="hidden sm:block w-px h-6 bg-border" />
          
                      <motion.a
                        href={DISCORD_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors text-xs md:text-sm"
                        whileHover={{ x: 2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <SiDiscord className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
                        <span>Join Community</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">
                          →
                        </span>
                      </motion.a>
                    </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.15 }}
            className="flex flex-col gap-4 mt-2"
          >
            <div className="flex items-center text-sm text-muted-foreground">
              <span>email me at&nbsp;</span>
              <motion.button
                onClick={copyEmail}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-0 cursor-pointer"
              >
                <span className={`inline-flex items-center overflow-hidden transition-all duration-300 ease-out ${copied ? "w-5" : "w-0 group-hover:w-5"}`}>
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="inline-flex items-center shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="inline-flex items-center shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5 text-primary" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 group-hover:decoration-primary group-hover:text-primary transition-colors duration-200">
                  {email}
                </span>
              </motion.button>
            </div>

            <motion.div
              whileHover={{ y: -2, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.95 }}
              className="w-fit"
            >
              <Link
                href="/resume"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Paperclip className="w-4 h-4" />
                <span>view resume</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
