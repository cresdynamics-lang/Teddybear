"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatKES } from "@/lib/format";
import { getProductPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import StickyBuyBar from "@/components/StickyBuyBar";
import type { Product as ProductType } from "@/lib/types";

interface Props {
  product: Product;
  related: ProductType[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const price = getProductPrice(product, variantId);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart({
      productId: product.id,
      variantId,
      quantity,
      customization: customization.trim() || undefined,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-28 lg:pb-10">
      <nav className="text-sm text-cocoa/50 mb-8">
        <Link href="/" className="hover:text-plum transition">
          Home
        </Link>
        {" / "}
        <Link href="/shop" className="hover:text-plum transition">
          Shop
        </Link>
        {" / "}
        <span className="text-cocoa font-medium">{product.shortName}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-ivory-dark mb-4 shadow-soft border border-white">
            <ProductImage
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              priority
            />
            {!product.inStock && <span className="badge-sold text-sm px-5 py-2">Sold Out</span>}
            {product.salePrice && product.inStock && (
              <span className="badge-sale text-sm px-5 py-2">On Sale</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i
                      ? "border-plum shadow-soft scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <ProductImage src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:py-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cocoa leading-tight mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-honey">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-current" : "text-brand-200"}`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-cocoa/50">
              {product.rating} · Loved in Nairobi
            </span>
          </div>

          <div className="mb-8 p-5 rounded-2xl bg-ivory-dark/80 border border-brand-100">
            {product.salePrice ? (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-plum">
                  {formatKES(product.salePrice)}
                </span>
                <span className="text-xl text-cocoa/35 line-through">
                  {formatKES(product.price)}
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-plum">{formatKES(price)}</span>
            )}
          </div>

          <p className="text-cocoa/70 leading-relaxed mb-8 text-lg">{product.description}</p>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-bold text-cocoa mb-3 uppercase tracking-wide">
                Choose option
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all ${
                      variantId === v.id
                        ? "border-plum bg-plum text-white shadow-soft"
                        : "border-brand-200 hover:border-plum/40"
                    }`}
                  >
                    {v.name} – {formatKES(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(product.customizable || product.category === "personalized") && (
            <div className="mb-6">
              <label htmlFor="custom-name" className="block text-sm font-bold mb-2">
                Custom name (optional)
              </label>
              <input
                id="custom-name"
                type="text"
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="Enter name for embroidery"
                className="input-field"
                maxLength={20}
              />
            </div>
          )}

          {product.inStock && (
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold">Quantity</span>
              <div className="flex items-center border-2 border-brand-200 rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-ivory-dark transition"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-ivory-dark transition"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {product.inStock ? (
              <button type="button" onClick={handleAddToCart} className="btn-primary flex-1 sm:flex-none">
                <ShoppingBag className="w-4 h-4" />
                Add to cart
              </button>
            ) : (
              <Link href="/contact" className="btn-primary">
                Notify when available
              </Link>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`btn-secondary ${wished ? "!border-plum !text-plum" : ""}`}
            >
              <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
              Wishlist
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-cocoa/60">
            <span className="flex items-center gap-2 bg-sage/15 text-sage-dark px-4 py-2 rounded-full font-medium">
              🚚 Same-day Nairobi
            </span>
            <span className="flex items-center gap-2 bg-honey/20 text-plum px-4 py-2 rounded-full font-medium">
              💳 M-Pesa accepted
            </span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <StickyBuyBar
        product={product}
        variantId={variantId}
        quantity={quantity}
      />
    </div>
  );
}
