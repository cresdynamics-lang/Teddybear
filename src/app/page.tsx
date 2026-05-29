import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import NewsletterStrip from "@/components/NewsletterStrip";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

const bentoStyles: Record<string, string> = {
  "giant-teddy-bear": "md:col-span-2 md:row-span-2 bg-gradient-to-br from-plum/10 to-honey/20",
  "big-teddy-bear": "bg-gradient-to-br from-honey/15 to-plum/10",
  "teddy-bear": "bg-gradient-to-br from-brand-100 to-ivory-dark",
  "mini-teddy-bear": "bg-gradient-to-br from-sage/10 to-ivory-dark",
  personalized: "bg-gradient-to-br from-plum/15 to-honey/10",
};

export default function HomePage() {
  const featured = products.filter((p) => p.featured && p.inStock).slice(0, 8);

  return (
    <>
      <Hero />
      <TrustMarquee />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow="Shop by size"
          title="Find your perfect teddy bear"
          description="From mini plush keychains to 140cm life-size giants — every bear is soft, huggable, and ready to gift."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className={`bento-tile group ${
                bentoStyles[cat.id] ?? "bg-white"
              } ${i === 0 ? "col-span-2 row-span-2 min-h-[200px] md:min-h-[280px]" : ""}`}
            >
              <span className="text-4xl md:text-5xl mb-auto group-hover:scale-110 transition-transform duration-500 block">
                🧸
              </span>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold text-cocoa group-hover:text-plum transition">
                  {cat.name}
                </h3>
                <p className="text-sm text-cocoa/45 mt-1 flex items-center gap-1">
                  {cat.count} teddy bear{cat.count !== 1 ? "s" : ""}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="/shop"
            className="bento-tile bg-plum text-white group col-span-2 md:col-span-1"
          >
            <span className="text-3xl mb-auto">🐻</span>
            <h3 className="font-display text-lg font-bold group-hover:text-honey transition">
              All teddy bears
            </h3>
            <p className="text-sm text-white/60">{products.length} plush bears</p>
          </Link>
        </div>
      </section>

      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Customer favourites"
              title="Featured teddy bears"
              description="Our most-loved plush bears — from cuddly classics to life-size giants."
              align="left"
              className="!mb-0"
            />
            <Link
              href="/shop"
              className="btn-secondary shrink-0 self-start sm:self-auto"
            >
              Shop all bears
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-100/80 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Teddy lovers served" },
            { value: "140cm", label: "Tallest teddy bear" },
            { value: "Same day", label: "Nairobi delivery" },
            { value: "KSh 800", label: "Bears from" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl md:text-3xl font-bold text-plum">
                {stat.value}
              </p>
              <p className="text-sm text-cocoa/50 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative rounded-[2rem] overflow-hidden shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-br from-plum via-plum-light to-plum-dark" />
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="relative grid md:grid-cols-2 gap-8 p-10 md:p-16 items-center">
            <div className="text-white">
              <p className="text-honey font-bold text-xs uppercase tracking-widest mb-3">
                Make it personal
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Name embroidery on your teddy
              </h2>
              <p className="text-white/75 text-lg leading-relaxed">
                Add their name to any teddy bear you buy from us — from just KSh 500.
                The sweetest personalised gift in Kenya.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link
                href="/product/teddy-bear-name-embroidery"
                className="inline-flex justify-center rounded-full bg-honey text-plum-dark px-8 py-4 font-bold hover:bg-honey-light transition shadow-glow"
              >
                Add name embroidery
              </Link>
              <Link
                href="/shop?category=giant-teddy-bear"
                className="inline-flex justify-center rounded-full border-2 border-white/30 text-white px-8 py-4 font-bold hover:bg-white/10 transition"
              >
                Shop giant bears
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </>
  );
}
