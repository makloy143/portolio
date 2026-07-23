"use client";

import { motion } from "framer-motion";

export function HeroSpotlight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute -top-[30%] left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--spotlight)_0%,transparent_68%)] opacity-70 dark:opacity-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        className="absolute top-[20%] right-[5%] h-48 w-48 rounded-full bg-[radial-gradient(circle,var(--spotlight-accent)_0%,transparent_70%)] opacity-40 blur-2xl dark:opacity-25"
      />
    </div>
  );
}
