"use client";

import Return from "@/components/ui/Return";
import { motion } from "framer-motion";
import Image from "next/image";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export default function DonateThanks() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full text-center space-y-8"
      >
        <motion.div
          variants={staggerItem}
          className="mx-auto"
        >
          <Image
            src="/avatar/avatar.png"
            alt="Rohith N R"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
        >
          thank you{" "}
          <span className="text-primary">so much</span>
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          your donation{" "}
          <span className="highlight-text font-semibold">means the world</span>{" "}
          to me
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="text-sm text-muted-foreground/60 leading-relaxed max-w-sm mx-auto"
        >
          seriously — every contribution keeps me going, fuels late-night coding sessions,
          and helps me keep{" "}
          <span className="highlight-text">building cool stuff</span>{" "}
          for everyone. you&apos;re a real one. 💚
        </motion.p>

        <motion.div variants={staggerItem}>
          <Return href="/" label="return home" className="pt-4 flex justify-center" />
        </motion.div>
      </motion.div>
    </div>
  );
}
