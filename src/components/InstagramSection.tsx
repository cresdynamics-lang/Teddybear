import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { UGC_IMAGES } from "@/lib/products";
import { site } from "@/lib/site";

export default function InstagramSection() {
  return (
    <section className="py-16 container-main">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-medium text-ink">
          Tag us {site.instagram}
        </h2>
        <p className="text-ink-muted mt-2 text-sm">Share your BearHug moments with us</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {UGC_IMAGES.map((src, i) => (
          <a
            key={i}
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden"
          >
            <Image src={src} alt={`Customer photo ${i + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
