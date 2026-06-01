import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
import { Search } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function ProductGrid({
  products,
  emptyTitle = "No bears found",
  emptyDescription = "Try a different occasion or browse our full collection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Browse all bears"
        actionHref="/shop"
        secondaryLabel="Build custom bear"
        secondaryHref="/custom"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
