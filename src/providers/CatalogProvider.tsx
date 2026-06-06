"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { readCatalogCache, writeCatalogCache } from "@/lib/catalogCache";
import { useCatalogStore, defaultSiteSettings } from "@/store/catalogStore";
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from "@/lib/products";
import type { CatalogBundle } from "@/types/catalog";
import { CatalogSeedContext } from "@/providers/catalogContext";

type Props = {
  children: React.ReactNode;
  /** Server-fetched catalog so the shop is not blocked on a slow client /api/catalog call. */
  initialCatalog?: CatalogBundle;
  /** Admin routes never need the full storefront catalog. */
  skipCatalog?: boolean;
};

function isLiveCatalog(bundle: CatalogBundle | null | undefined): bundle is CatalogBundle {
  return Boolean(bundle?.productsFromDatabase && bundle.products.length > 0);
}

function applyBundle(bundle: CatalogBundle) {
  useCatalogStore.getState().hydrate(bundle);
  if (bundle.productsFromDatabase) {
    writeCatalogCache(bundle);
  }
}

export default function CatalogProvider({ children, initialCatalog, skipCatalog }: Props) {
  const hydrate = useCatalogStore((s) => s.hydrate);
  const productsFromDatabase = useCatalogStore((s) => s.productsFromDatabase);
  const setLoading = useCatalogStore((s) => s.setLoading);
  const fetchStarted = useRef(false);

  useLayoutEffect(() => {
    if (skipCatalog) {
      useCatalogStore.setState({ loaded: true, loading: false });
      return;
    }
    if (isLiveCatalog(initialCatalog)) {
      applyBundle(initialCatalog);
      return;
    }
    const cached = readCatalogCache();
    if (isLiveCatalog(cached)) {
      hydrate(cached);
    }
  }, [initialCatalog, hydrate, skipCatalog]);

  useEffect(() => {
    if (skipCatalog || productsFromDatabase) return;
    if (fetchStarted.current) return;
    fetchStarted.current = true;

    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/catalog", { signal: controller.signal });
        if (!res.ok) throw new Error("catalog fetch failed");
        const bundle = (await res.json()) as CatalogBundle;
        if (cancelled) return;
        if (isLiveCatalog(bundle)) {
          applyBundle(bundle);
          return;
        }
        throw new Error("catalog not in database");
      } catch {
        if (cancelled || controller.signal.aborted) return;
        hydrate({
          products: DEFAULT_PRODUCTS,
          testimonials: DEFAULT_TESTIMONIALS,
          settings: defaultSiteSettings,
          productsFromDatabase: false,
          testimonialsFromDatabase: false,
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
      fetchStarted.current = false;
    };
  }, [hydrate, productsFromDatabase, setLoading, skipCatalog]);

  return (
    <CatalogSeedContext.Provider value={skipCatalog ? null : (initialCatalog ?? null)}>
      {children}
    </CatalogSeedContext.Provider>
  );
}
