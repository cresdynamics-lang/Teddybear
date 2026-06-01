"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTestimonials } from "@/hooks/useCatalog";

export default function TestimonialCarousel() {
  const testimonials = useTestimonials();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[index];

  return (
    <section className="py-16 md:py-24 bg-blush/20 paw-pattern">
      <div className="container-main">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-caramel mb-2">
            Love Letters
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">
            Stories from our customers
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-cream rounded-3xl p-8 md:p-10 shadow-card text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-ink leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="font-semibold text-ink">{t.name}</p>
              <p className="text-sm text-ink-muted">{t.city}</p>
              <span className="inline-block mt-3 text-xs font-medium bg-blush/50 text-caramel px-3 py-1 rounded-full">
                {t.occasion}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-caramel/20 flex items-center justify-center hover:bg-caramel/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? "bg-caramel" : "bg-caramel/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-caramel/20 flex items-center justify-center hover:bg-caramel/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
