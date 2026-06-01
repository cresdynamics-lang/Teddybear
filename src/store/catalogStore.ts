import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import type { SiteSettings, Testimonial } from "@/types/admin";
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from "@/lib/products";
import { site } from "@/lib/site";

export const defaultSiteSettings: SiteSettings = {
  name: site.name,
  tagline: site.tagline,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  email: site.email,
  whatsapp: site.whatsapp,
  mpesaTill: site.mpesa.till,
  freeDeliveryThreshold: site.delivery.freeThreshold,
  standardDeliveryFee: site.delivery.standardFee,
  giftWrapFee: site.delivery.giftWrapFee,
  hours: site.hours,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface CatalogState {
  products: Product[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  addProduct: (product: Omit<Product, "id" | "slug" | "createdAt"> & { slug?: string }) => Product;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  addTestimonial: (t: Omit<Testimonial, "id">) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  updateSettings: (data: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
}

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: DEFAULT_PRODUCTS,
      testimonials: DEFAULT_TESTIMONIALS,
      settings: defaultSiteSettings,

      addProduct: (data) => {
        const id = `p-${Date.now()}`;
        const slug = data.slug || slugify(data.name);
        const product: Product = {
          ...data,
          id,
          slug,
          createdAt: new Date().toISOString().split("T")[0],
          images: data.images?.length ? data.images : [data.image],
        };
        set((s) => ({ products: [product, ...s.products] }));
        return product;
      },

      updateProduct: (id, data) =>
        set((s) => ({
          products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),

      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      getProductById: (id) => get().products.find((p) => p.id === id),

      getProductBySlug: (slug) => get().products.find((p) => p.slug === slug),

      addTestimonial: (data) => {
        const testimonial: Testimonial = { ...data, id: `t-${Date.now()}` };
        set((s) => ({ testimonials: [...s.testimonials, testimonial] }));
      },

      updateTestimonial: (id, data) =>
        set((s) => ({
          testimonials: s.testimonials.map((t) => (t.id === id ? { ...t, ...data } : t)),
        })),

      deleteTestimonial: (id) =>
        set((s) => ({ testimonials: s.testimonials.filter((t) => t.id !== id) })),

      updateSettings: (data) =>
        set((s) => ({ settings: { ...s.settings, ...data } })),

      resetToDefaults: () =>
        set({
          products: DEFAULT_PRODUCTS,
          testimonials: DEFAULT_TESTIMONIALS,
          settings: defaultSiteSettings,
        }),
    }),
    { name: "bearhug-catalog" }
  )
);
