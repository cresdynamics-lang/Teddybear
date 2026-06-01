"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCatalogLoading, useProducts } from "@/hooks/useCatalog";
import ProductGridSkeleton from "@/components/loading/ProductGridSkeleton";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import FadeIn from "@/components/loading/FadeIn";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const ids = useWishlistStore((s) => s.ids);
  const allProducts = useProducts();
  const catalogLoading = useCatalogLoading();

  useEffect(() => setMounted(true), []);

  const wishlistProducts = allProducts.filter((p) => ids.includes(p.id));

  if (!mounted || catalogLoading) {
    return (
      <div className="container-main py-10 md:py-12">
        <h1 className="font-display text-3xl font-medium mb-8">My Wishlist</h1>
        <ProductGridSkeleton count={4} />
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Tap the heart on any bear to save it for later — we'll keep it here for you."
        actionLabel="Explore bears"
        actionHref="/shop"
      />
    );
  }

  return (
    <FadeIn className="container-main py-10 md:py-12">
      <h1 className="font-display text-3xl font-medium mb-2">My Wishlist</h1>
      <p className="text-ink-muted mb-8">{wishlistProducts.length} saved bear(s)</p>
      <ProductGrid products={wishlistProducts} />
    </FadeIn>
  );
}
