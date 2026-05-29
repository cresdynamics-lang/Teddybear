import Link from "next/link";
import { ArrowRight, Sparkles, Truck } from "lucide-react";
import ProductImage from "@/components/ProductImage";
import { HERO_IMAGE } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-mesh-hero">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-60" />
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-honey/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-sage/15 rounded-full blur-3xl animate-float [animation-delay:2s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 rounded-full px-4 py-2 mb-8 shadow-card">
              <Sparkles className="w-4 h-4 text-honey-dark" />
              <span className="text-xs font-bold uppercase tracking-widest text-plum">
                Kenya&apos;s Teddy Bear Specialists
              </span>
            </div>

            <h1 className="font-display text-[2.75rem] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-cocoa leading-[1.02] mb-6">
              Giant teddy bears
              <br />
              <span className="text-gradient italic">made to hug</span>
            </h1>

            <p className="text-cocoa/60 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Life-size plush teddy bears from 45cm to 140cm. Soft, cuddly, and
              delivered across Nairobi — the perfect gift for every occasion.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/shop" className="btn-primary group text-base px-8 py-4">
                Shop Teddy Bears
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Let&apos;s Chat
              </Link>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sage/20 shadow-card">
                  <Truck className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <strong className="text-cocoa block text-sm">Same-day</strong>
                  <span className="text-xs text-cocoa/50">Nairobi delivery</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-honey/25 shadow-card text-xl leading-none">
                  🧸
                </div>
                <div>
                  <strong className="text-cocoa block text-sm">Up to 140cm</strong>
                  <span className="text-xs text-cocoa/50">Life-size giants</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative animate-fade-up [animation-delay:0.15s]">
            <div className="absolute -inset-6 bg-gradient-to-br from-honey/25 via-plum/10 to-sage/20 rounded-[3rem] blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-elevated border-[5px] border-white aspect-[4/5] max-w-md mx-auto lg:max-w-none ring-1 ring-plum/10">
              <ProductImage src={HERO_IMAGE} alt="Giant teddy bear Kenya" priority />
            </div>
            <div className="absolute -bottom-5 -left-4 md:-left-10 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-elevated border border-white animate-float [animation-delay:1s]">
              <p className="text-3xl font-display font-bold text-plum leading-none">4.9★</p>
              <p className="text-xs text-cocoa/50 font-semibold mt-1">500+ teddy lovers</p>
            </div>
            <div className="absolute -top-3 -right-3 md:-right-8 bg-plum text-white rounded-2xl px-5 py-3.5 shadow-glow rotate-3 hover:rotate-0 transition-transform">
              <p className="text-[10px] font-black uppercase tracking-widest text-honey-light">New arrival</p>
              <p className="text-base font-display font-bold">140cm Giants</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
