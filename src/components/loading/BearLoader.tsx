"use client";

import { motion } from "framer-motion";

interface BearLoaderProps {
  size?: "sm" | "md" | "lg";
  showRings?: boolean;
}

const sizes = {
  sm: { box: "w-12 h-12", emoji: "text-2xl", ring: "inset-1" },
  md: { box: "w-20 h-20", emoji: "text-4xl", ring: "inset-0" },
  lg: { box: "w-28 h-28", emoji: "text-5xl", ring: "inset-0" },
};

export default function BearLoader({ size = "md", showRings = true }: BearLoaderProps) {
  const s = sizes[size];

  return (
    <div className={`relative ${s.box} mx-auto`} role="status" aria-label="Loading">
      {showRings && (
        <>
          <motion.span
            className={`absolute ${s.ring} rounded-3xl border-2 border-caramel/25`}
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className={`absolute ${s.ring} rounded-3xl border-2 border-blush-dark/40`}
            animate={{ scale: [1.08, 1.22, 1.08], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
          />
        </>
      )}
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-blush/50 to-caramel/10 shadow-soft"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className={s.emoji} aria-hidden>
          🧸
        </span>
      </motion.div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
