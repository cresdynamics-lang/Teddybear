"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const done = window.setTimeout(() => setActive(false), 520);
    return () => window.clearTimeout(done);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left bg-gradient-to-r from-caramel via-blush-dark to-caramel"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}
