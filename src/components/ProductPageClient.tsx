"use client";

import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { useCatalogLoaded, useProductBySlug } from "@/hooks/useCatalog";
import ProductDetailSkeleton from "@/components/loading/ProductDetailSkeleton";
import FadeIn from "@/components/loading/FadeIn";

export default function ProductPageClient({ slug }: { slug: string }) {
  const loaded = useCatalogLoaded();
  const product = useProductBySlug(slug);

  if (!loaded) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    notFound();
  }

  return (
    <FadeIn>
      <ProductDetailClient product={product} />
    </FadeIn>
  );
}
