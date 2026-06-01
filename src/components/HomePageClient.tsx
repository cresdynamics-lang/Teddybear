"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import OccasionStrip from "@/components/OccasionStrip";
import ProductGrid from "@/components/ProductGrid";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import NewsletterSection from "@/components/NewsletterSection";
import { HowItWorks } from "@/components/HowItWorks";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import InstagramSection from "@/components/InstagramSection";
import CustomBearCTA from "@/components/CustomBearCTA";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import { useFilteredProducts } from "@/hooks/useCatalog";
import { useCatalogStore } from "@/store/catalogStore";

export default function HomePageClient() {
  const [occasion, setOccasion] = useState("All");
  const loading = useCatalogStore((s) => s.loading);
  const products = useFilteredProducts({ occasion, sort: "featured" }).slice(0, 6);

  return (
    <>
      <HeroSection />
      <TrustBar />

      <section className="section-pad bg-cream">
        <div className="container-main">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <SectionHeading
              title="Shop by Occasion"
              subtitle="Find the perfect bear for birthdays, love, and every special moment."
            />
            <Link href="/shop" className="text-sm font-semibold text-caramel hover:underline shrink-0">
              View all bears →
            </Link>
          </div>
          <OccasionStrip selected={occasion} onSelect={setOccasion} />
          <div className="mt-8">
            {loading ? <ProductGridSkeleton count={6} /> : <ProductGrid products={products} />}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CustomBearCTA />
      <TestimonialCarousel />
      <InstagramSection />
      <NewsletterSection />

      <section id="about" className="section-pad bg-white">
        <div className="container-main max-w-2xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-caramel mb-3">Our story</p>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-5 text-ink">About BearHug KE</h2>
          <p className="text-ink-muted leading-relaxed text-lg">
            Born in Nairobi, BearHug KE curates premium teddy bears for life&apos;s most meaningful
            moments. Every bear is handpicked for quality, warmth, and that perfect hug — delivered
            across Kenya with care.
          </p>
        </div>
      </section>
    </>
  );
}
