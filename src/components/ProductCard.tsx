"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/format";
import { getProductPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductImage from "@/components/ProductImage";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const price = getProductPrice(product);
  const wished = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart({
      productId: product.id,
      variantId: product.variants?.[0]?.id,
      quantity: 1,
    });
  };

  return (
    <article className="card-hover group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[4/5] overflow-hidden bg-ivory-dark"
      >
        <ProductImage
          src={product.image}
          alt={product.shortName}
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
        {!product.inStock && <span className="badge-sold">Sold Out</span>}
        {product.salePrice && product.inStock && (
          <span className="badge-sale">Sale</span>
        )}
        {product.featured && product.inStock && !product.salePrice && (
          <span className="absolute top-3 left-3 z-20 bg-sage text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
            Popular
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md shadow-card transition-all duration-300 hover:scale-110 ${
            wished
              ? "bg-plum text-white"
              : "bg-white/90 text-cocoa/40 hover:text-plum"
          }`}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
        </button>
      </Link>

      <div className="p-4 md:p-5 flex flex-col flex-1 border-t border-brand-100/50">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-honey text-honey" />
          <span className="text-xs font-semibold text-cocoa/50">{product.rating}</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-base font-semibold text-cocoa line-clamp-2 group-hover:text-plum transition-colors mb-3">
            {product.shortName}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            {product.salePrice ? (
              <>
                <span className="text-plum font-bold text-lg">
                  {formatKES(product.salePrice)}
                </span>
                <span className="text-xs text-cocoa/35 line-through ml-2">
                  {formatKES(product.price)}
                </span>
              </>
            ) : product.variants && product.variants.length > 1 ? (
              <span className="text-plum font-bold">
                {formatKES(Math.min(...product.variants.map((v) => v.price)))}
                <span className="text-cocoa/40 font-normal text-sm"> +</span>
              </span>
            ) : (
              <span className="text-plum font-bold text-lg">{formatKES(price)}</span>
            )}
          </div>

          {product.inStock ? (
            product.variants && product.variants.length > 1 ? (
              <Link
                href={`/product/${product.slug}`}
                className="text-xs font-bold text-plum hover:text-honey-dark transition shrink-0"
              >
                Options →
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="p-2.5 rounded-full bg-plum text-white shadow-soft hover:bg-plum-light hover:shadow-glow transition-all duration-300 hover:scale-105"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-bold text-cocoa/50 hover:text-plum transition"
            >
              Details →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
