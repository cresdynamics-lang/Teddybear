"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-plum-dark via-plum to-plum-light text-white text-center text-xs sm:text-sm py-2.5 px-10">
      <div className="flex items-center justify-center gap-2 font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-honey shrink-0" />
        <span>
          Free gift wrap on teddy bears · Same-day delivery in Nairobi CBD
        </span>
        <Link
          href="/shop"
          className="hidden sm:inline underline underline-offset-2 decoration-honey/80 hover:text-honey ml-1"
        >
          Shop now
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/15 transition"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
