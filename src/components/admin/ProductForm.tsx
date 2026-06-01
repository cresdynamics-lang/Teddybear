"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import type { BearColor, BearSize, Occasion, ProductBadge } from "@/types/product";
import { BEAR_COLORS, BEAR_SIZES, OCCASIONS } from "@/lib/products";

const occasionOptions = OCCASIONS.filter((o) => o !== "All") as Occasion[];

interface ProductFormProps {
  initial?: Product;
  onSubmit: (data: Omit<Product, "id" | "createdAt">) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const emptyProduct = (): Omit<Product, "id" | "createdAt"> => ({
  slug: "",
  name: "",
  tagline: "",
  description: "",
  careInstructions: "Spot clean with mild detergent. Air dry.",
  deliveryInfo: "Same-day Nairobi before 12PM. Standard 2–3 days nationwide.",
  price: 2500,
  size: "M",
  color: "Brown",
  occasions: ["Just Because"],
  image: "/images/image2.webp",
  images: ["/images/image2.webp"],
  featured: false,
});

export default function ProductForm({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save Product",
}: ProductFormProps) {
  const [form, setForm] = useState<Omit<Product, "id" | "createdAt">>(
    initial ?? emptyProduct()
  );

  useEffect(() => {
    if (initial) {
      const { id: _id, createdAt: _c, ...rest } = initial;
      setForm(rest);
    }
  }, [initial]);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleOccasion = (o: Occasion) =>
    update(
      "occasions",
      form.occasions.includes(o)
        ? form.occasions.filter((x) => x !== o)
        : [...form.occasions, o]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = form.images.length ? form.images : [form.image];
    onSubmit({ ...form, images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 shadow-card">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium mb-1 block">Product Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="input-field"
            placeholder="auto-generated if empty"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Price (KSh) *</label>
          <input
            required
            type="number"
            min={100}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className="input-field"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium mb-1 block">Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Size</label>
          <select
            value={form.size}
            onChange={(e) => update("size", e.target.value as BearSize)}
            className="input-field"
          >
            {BEAR_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Color</label>
          <select
            value={form.color}
            onChange={(e) => update("color", e.target.value as BearColor)}
            className="input-field"
          >
            {BEAR_COLORS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Badge</label>
          <select
            value={form.badge ?? ""}
            onChange={(e) =>
              update("badge", (e.target.value || undefined) as ProductBadge | undefined)
            }
            className="input-field"
          >
            <option value="">None</option>
            <option value="Best Seller">Best Seller</option>
            <option value="New Arrival">New Arrival</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured ?? false}
              onChange={(e) => update("featured", e.target.checked)}
              className="w-4 h-4 accent-caramel"
            />
            <span className="text-sm font-medium">Featured product</span>
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium mb-1 block">Image URL</label>
          <input
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className="input-field"
            placeholder="/images/image2.webp"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Occasions</label>
        <div className="flex flex-wrap gap-2">
          {occasionOptions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggleOccasion(o)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                form.occasions.includes(o)
                  ? "bg-caramel text-white border-caramel"
                  : "border-gray-200"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="input-field resize-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Care Instructions</label>
          <textarea
            rows={2}
            value={form.careInstructions}
            onChange={(e) => update("careInstructions", e.target.value)}
            className="input-field resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Delivery Info</label>
          <textarea
            rows={2}
            value={form.deliveryInfo}
            onChange={(e) => update("deliveryInfo", e.target.value)}
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary bg-caramel">{submitLabel}</button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
