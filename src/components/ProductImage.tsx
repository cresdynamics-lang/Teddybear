"use client";

import { useEffect, useMemo, useState } from "react";
import { IMAGE_FALLBACK, imageSrcCandidates } from "@/lib/images";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** cover = fill frame (product cards). contain = show full image (optional) */
  fit?: "cover" | "contain";
}

export default function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
  fit = "cover",
}: ProductImageProps) {
  const candidates = useMemo(() => imageSrcCandidates(src), [src]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const currentSrc =
    index < candidates.length ? candidates[index] : IMAGE_FALLBACK;

  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [src]);

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className="relative w-full h-full min-h-[1px] overflow-hidden bg-ivory-dark">
      {!loaded && (
        <div
          className="absolute inset-0 z-10 animate-shimmer bg-gradient-to-r from-ivory-dark via-white to-ivory-dark bg-[length:200%_100%]"
          aria-hidden
        />
      )}
      {/* Native img: works with any upload size/dimension — no Next.js optimizer required */}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className={`absolute inset-0 w-full h-full max-w-none ${fitClass} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (index + 1 < candidates.length) {
            setIndex((i) => i + 1);
            setLoaded(false);
          } else if (currentSrc !== IMAGE_FALLBACK) {
            setIndex(candidates.length);
            setLoaded(false);
          } else {
            setLoaded(true);
          }
        }}
      />
    </div>
  );
}
