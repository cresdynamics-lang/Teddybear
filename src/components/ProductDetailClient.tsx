"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Heart, ChevronDown, Smartphone } from "lucide-react";
import type { Product } from "@/types/product";
import { BEAR_SIZES, SIZE_PRICES, getRelatedProducts } from "@/lib/products";
import { useProducts } from "@/hooks/useCatalog";
import { formatKES } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "./ProductCard";
import type { BearColor, BearSize } from "@/types/product";

const COLOR_SWATCHES: Record<BearColor, string> = {
  Brown: "#8B5E3C",
  White: "#FFF8F0",
  Pink: "#F5C5C5",
  Grey: "#9E9E9E",
  Custom: "#7B68EE",
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState<BearSize>(product.size);
  const [color, setColor] = useState<BearColor>(product.color);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const allProducts = useProducts();
  const price = Math.round((product.price / SIZE_PRICES[product.size]) * SIZE_PRICES[size]);
  const related = getRelatedProducts(allProducts, product.slug);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[selectedImage] || product.image,
      size,
      color,
      quantity,
      price,
      personalMessage: message || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const accordions = [
    { id: "description", title: "Description", content: product.description },
    { id: "care", title: "Care Instructions", content: product.careInstructions },
    { id: "delivery", title: "Delivery Info", content: product.deliveryInfo },
  ];

  return (
    <div>
      <div className="container-main py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush/20 shadow-card mb-4">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-caramel" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-medium text-ink">
              {product.name}
            </h1>
            <p className="text-ink-muted mt-2">{product.tagline}</p>
            <p className="text-2xl md:text-3xl font-semibold text-caramel mt-4">
              {formatKES(price)}
            </p>

            {/* Size */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {BEAR_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium border-2 transition-all ${
                      size === s
                        ? "border-caramel bg-caramel text-white"
                        : "border-caramel/20 hover:border-caramel/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex gap-3">
                {(Object.keys(COLOR_SWATCHES) as BearColor[]).slice(0, 4).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    title={c}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      color === c ? "border-caramel scale-110" : "border-ink/10"
                    }`}
                    style={{ backgroundColor: COLOR_SWATCHES[c] }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="inline-flex items-center border border-caramel/20 rounded-full">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center"
                  aria-label="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center"
                  aria-label="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3 min-h-[44px] rounded-full text-sm font-semibold text-white transition-colors ${
                  added ? "bg-mpesa" : "bg-caramel hover:bg-caramel-dark"
                }`}
              >
                {added ? "✓ Added!" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="btn-outline flex-1"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-caramel text-caramel" : ""}`} />
                Wishlist
              </button>
            </div>

            <p className="text-sm text-ink-muted mt-4">
              🚚 Order before 12PM for same-day Nairobi delivery
            </p>
            <div className="inline-flex items-center gap-2 mt-2 bg-mpesa/10 text-mpesa text-sm font-medium px-4 py-2 rounded-full">
              <Smartphone className="w-4 h-4" /> M-Pesa accepted
            </div>

            {/* Personal message */}
            <div className="mt-6">
              <label className="text-sm font-medium mb-2 block">Add a Personal Message (optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                rows={2}
                className="input-field resize-none"
                placeholder="Your message on the gift card…"
              />
              <p className="text-xs text-ink-light text-right mt-1">{message.length}/100</p>
            </div>

            {/* Accordion */}
            <div className="mt-8 space-y-2">
              {accordions.map((acc) => (
                <div key={acc.id} className="border border-caramel/10 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(openAccordion === acc.id ? null : acc.id)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-sm font-medium hover:bg-caramel/5"
                  >
                    {acc.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === acc.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openAccordion === acc.id && (
                    <div className="px-4 pb-4 text-sm text-ink-muted leading-relaxed">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-main py-12 border-t border-caramel/10">
          <h2 className="font-display text-2xl font-medium mb-6">You may also like</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {related.map((p, i) => (
              <div key={p.id} className="w-[200px] sm:w-[240px] shrink-0">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
