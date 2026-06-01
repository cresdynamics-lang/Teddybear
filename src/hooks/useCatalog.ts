import { useCatalogStore } from "@/store/catalogStore";
import { filterProducts as filterProductsLib } from "@/lib/products";
import type { BearColor, BearSize, Product } from "@/types/product";

export function useProducts() {
  return useCatalogStore((s) => s.products);
}

export function useTestimonials() {
  return useCatalogStore((s) => s.testimonials);
}

export function useSiteSettings() {
  return useCatalogStore((s) => s.settings);
}

export function useProductBySlug(slug: string): Product | undefined {
  return useCatalogStore((s) => s.products.find((p) => p.slug === slug));
}

export function useFilteredProducts(filters: {
  occasion?: string;
  sizes?: BearSize[];
  colors?: BearColor[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) {
  const products = useProducts();
  return filterProductsLib(products, filters);
}
