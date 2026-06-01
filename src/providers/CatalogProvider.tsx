"use client";

import { useEffect } from "react";
import { fetchCatalogBundle } from "@/lib/actions/catalog";
import { useCatalogStore, defaultSiteSettings } from "@/store/catalogStore";
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from "@/lib/products";

export default function CatalogProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useCatalogStore((s) => s.hydrate);
  const setLoading = useCatalogStore((s) => s.setLoading);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const bundle = await fetchCatalogBundle();
        if (!cancelled) hydrate(bundle);
      } catch {
        if (!cancelled) {
          hydrate({
            products: DEFAULT_PRODUCTS,
            testimonials: DEFAULT_TESTIMONIALS,
            settings: defaultSiteSettings,
            productsFromDatabase: false,
            testimonialsFromDatabase: false,
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [hydrate, setLoading]);

  return <>{children}</>;
}
