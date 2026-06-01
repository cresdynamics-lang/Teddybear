"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useProducts } from "@/hooks/useCatalog";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const ids = useWishlistStore((s) => s.ids);
  const allProducts = useProducts();

  useEffect(() => setMounted(true), []);

  const wishlistProducts = allProducts.filter((p) => ids.includes(p.id));

  if (!mounted) return null;

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-main py-16 text-center max-w-md mx-auto">
        <Heart className="w-12 h-12 text-caramel mx-auto mb-4" />
        <h1 className="font-display text-2xl font-medium mb-2">Your wishlist is empty</h1>
        <p className="text-ink-muted mb-6">
          Tap the heart on any bear to save it for later.
        </p>
        <Link href="/shop" className="btn-primary">
          Explore Bears
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-10">
      <h1 className="font-display text-3xl font-medium mb-2">My Wishlist</h1>
      <p className="text-ink-muted mb-8">{wishlistProducts.length} saved bear(s)</p>
      <ProductGrid products={wishlistProducts} />
    </div>
  );
}
