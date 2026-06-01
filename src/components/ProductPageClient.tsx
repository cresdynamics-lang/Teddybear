"use client";

import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { useProductBySlug } from "@/hooks/useCatalog";

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = useProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
