"use client";

import { OCCASIONS } from "@/lib/products";

interface OccasionStripProps {
  selected: string;
  onSelect: (occasion: string) => void;
  compact?: boolean;
}

export default function OccasionStrip({ selected, onSelect, compact }: OccasionStripProps) {
  const pills = (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${compact ? "" : "-mx-4 px-4 sm:mx-0 sm:px-0"}`}>
        {OCCASIONS.map((occasion) => (
          <button
            key={occasion}
            type="button"
            onClick={() => onSelect(occasion)}
            className={`shrink-0 px-5 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all ${
              selected === occasion
                ? "bg-caramel text-white shadow-soft"
                : "bg-white text-ink-muted border border-caramel/15 hover:border-caramel/40"
            }`}
          >
            {occasion}
          </button>
        ))}
    </div>
  );

  if (compact) return pills;

  return <div className="container-main py-6">{pills}</div>;
}
