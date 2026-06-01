"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import OccasionStrip from "@/components/OccasionStrip";
import ProductGrid from "@/components/ProductGrid";
import NewsletterSection from "@/components/NewsletterSection";
import { HowItWorks } from "@/components/HowItWorks";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramSection from "@/components/InstagramSection";
import CustomBearCTA from "@/components/CustomBearCTA";
import TrustBar from "@/components/TrustBar";
import { useFilteredProducts } from "@/hooks/useCatalog";

export default function HomePageClient() {
  const [occasion, setOccasion] = useState("All");
  const products = useFilteredProducts({ occasion, sort: "featured" }).slice(0, 6);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <section className="py-8">
        <div className="container-main">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-ink mb-4">
            Shop by Occasion
          </h2>
          <OccasionStrip selected={occasion} onSelect={setOccasion} />
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
      <HowItWorks />
      <CustomBearCTA />
      <TestimonialCarousel />
      <InstagramSection />
      <NewsletterSection />
      <section id="about" className="py-16 bg-white">
        <div className="container-main max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium mb-4">About BearHug KE</h2>
          <p className="text-ink-muted leading-relaxed">
            Born in Nairobi, BearHug KE curates premium teddy bears for life&apos;s most meaningful
            moments. Every bear is handpicked for quality, warmth, and that perfect hug — delivered
            across Kenya with love.
          </p>
        </div>
      </section>
    </>
  );
}
