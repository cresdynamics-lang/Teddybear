"use client";

import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import PageLoader from "@/components/PageLoader";
import { useProductBySlug } from "@/hooks/useCatalog";
import { useCatalogStore } from "@/store/catalogStore";

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = useProductBySlug(slug);
  const loaded = useCatalogStore((s) => s.loaded);
  const loading = useCatalogStore((s) => s.loading);

  if (!loaded || loading) {
    return <PageLoader label="Loading product…" />;
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
