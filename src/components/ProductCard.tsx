"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatKES } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: product.size,
      color: product.color,
      quantity: 1,
      price: product.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative"
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush/20 shadow-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes("fallback")) {
                target.src = "/images/fallback.svg";
              }
            }}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 z-10 bg-caramel text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-caramel text-caramel" : "text-ink-muted"}`}
            />
          </motion.button>

          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 md:group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                added ? "bg-mpesa text-white" : "bg-caramel text-white hover:bg-caramel-dark"
              }`}
            >
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-ink group-hover:text-caramel transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-blush/50 text-caramel px-2 py-0.5 rounded-full">
              {product.size}
            </span>
          </div>
          <p className="text-caramel font-semibold">{formatKES(product.price)}</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`md:hidden mt-2 w-full py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-colors ${
          added ? "bg-mpesa text-white" : "bg-caramel text-white"
        }`}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </motion.article>
  );
}
