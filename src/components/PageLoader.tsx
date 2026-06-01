"use client";

import { motion } from "framer-motion";
import BearLoader from "@/components/loading/BearLoader";

interface PageLoaderProps {
  label?: string;
  compact?: boolean;
  /** Subtle paw-print background */
  full?: boolean;
}

export default function PageLoader({
  label = "Loading your bears…",
  compact,
  full = true,
}: PageLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-14 px-4" : "py-24 md:py-32 px-4 min-h-[40vh]"
      } ${full ? "paw-pattern" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <BearLoader size={compact ? "md" : "lg"} />

      <motion.p
        className="mt-6 text-sm font-medium text-ink-muted max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {label}
      </motion.p>

      <div className="flex items-center gap-1.5 mt-4" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-caramel/70"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
