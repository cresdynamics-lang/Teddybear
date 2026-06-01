"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import {
  BEAR_SIZES,
  BEAR_COLORS,
  OCCASIONS,
  filterProducts,
} from "@/lib/products";
import { useProducts } from "@/hooks/useCatalog";
import type { BearColor, BearSize } from "@/types/product";
import ProductGrid from "./ProductGrid";
import OccasionStrip from "./OccasionStrip";

const PAGE_SIZE = 9;

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialOccasion = searchParams.get("occasion") || "All";

  const [occasion, setOccasion] = useState(initialOccasion);
  const [sizes, setSizes] = useState<BearSize[]>([]);
  const [colors, setColors] = useState<BearColor[]>([]);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const allProducts = useProducts();

  const filtered = useMemo(
    () =>
      filterProducts(allProducts, {
        occasion,
        sizes: sizes.length ? sizes : undefined,
        colors: colors.length ? colors : undefined,
        minPrice,
        maxPrice,
        sort,
      }),
    [occasion, sizes, colors, minPrice, maxPrice, sort, allProducts]
  );

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const toggleSize = (s: BearSize) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleColor = (c: BearColor) =>
    setColors((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const FilterPanel = useCallback(
    () => (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-sm mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {BEAR_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`px-4 py-2 min-h-[44px] rounded-full text-sm border transition-colors ${
                  sizes.includes(s)
                    ? "bg-caramel text-white border-caramel"
                    : "border-caramel/20 hover:border-caramel/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-3">
            Price: KSh {minPrice.toLocaleString()} – {maxPrice.toLocaleString()}
          </h3>
          <input
            type="range"
            min={500}
            max={15000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-caramel"
          />
        </div>

        <div>
          <h3 className="font-medium text-sm mb-3">Occasion</h3>
          <OccasionStrip selected={occasion} onSelect={setOccasion} compact />
        </div>

        <div>
          <h3 className="font-medium text-sm mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {BEAR_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleColor(c)}
                className={`px-4 py-2 min-h-[44px] rounded-full text-sm border transition-colors ${
                  colors.includes(c)
                    ? "bg-caramel text-white border-caramel"
                    : "border-caramel/20 hover:border-caramel/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    ),
    [sizes, colors, occasion, minPrice, maxPrice]
  );

  return (
    <div>
      <div className="bg-caramel/10 py-12 md:py-16">
        <div className="container-main">
          <h1 className="font-display text-3xl md:text-4xl font-medium text-ink">Shop Bears</h1>
          <p className="text-ink-muted mt-2">Handpicked plush companions for every occasion</p>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-sm text-ink-muted">{filtered.length} bears found</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full border border-caramel/20 text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field w-auto py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display text-lg font-medium mb-4">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <OccasionStrip selected={occasion} onSelect={setOccasion} />
            <div className="mt-6">
              <ProductGrid
                products={paginated}
                emptyTitle="No bears match your filters"
                emptyDescription="Adjust filters or browse all products to find your perfect bear."
              />
            </div>
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="btn-outline"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-cream rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium">Filters</h2>
              <button type="button" onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="btn-primary w-full mt-6"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
