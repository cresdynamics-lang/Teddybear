"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

const words = ["Send", "a", "hug", "that", "lasts", "forever."];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-caramel/20 via-blush/30 to-cream"
        style={{
          backgroundImage: "url(/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-cream/40" />

      <div className="container-main relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-widest text-caramel mb-4"
          >
            {site.tagline}
          </motion.p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-ink leading-[1.1] mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-ink-muted mb-8 max-w-lg leading-relaxed"
          >
            Premium plush bears for every occasion — same-day delivery in Nairobi, trusted
            nationwide shipping, and secure M-Pesa checkout.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/custom" className="btn-outline">
              Build a Custom Bear
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4 md:gap-8"
          >
            {[
              "🐻 Same-day Nairobi Delivery",
              "📱 Pay via M-Pesa",
              "🎁 Free Gift Wrapping",
            ].map((badge) => (
              <span
                key={badge}
                className="text-sm font-medium text-ink-muted bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
