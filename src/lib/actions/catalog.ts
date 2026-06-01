"use server";

import { createClient } from "@/lib/supabase/server";
import { mapProduct, mapSiteSettings, mapTestimonial } from "@/lib/supabase/mappers";
import type { SiteSettings, Testimonial } from "@/types/admin";
import type { Product } from "@/types/product";
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from "@/lib/products";
import { defaultSiteSettings } from "@/store/catalogStore";

export type CatalogBundle = {
  products: Product[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  productsFromDatabase: boolean;
  testimonialsFromDatabase: boolean;
};

export async function fetchCatalogBundle(): Promise<CatalogBundle> {
  let productsFromDatabase = false;
  let testimonialsFromDatabase = false;
  let products = DEFAULT_PRODUCTS;
  let testimonials = DEFAULT_TESTIMONIALS;
  let settings = defaultSiteSettings;

  try {
    const supabase = await createClient();

    const [productsRes, testimonialsRes, settingsRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at"),
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

    if (!productsRes.error && productsRes.data?.length) {
      products = productsRes.data.map(mapProduct);
      productsFromDatabase = true;
    }

    if (!testimonialsRes.error && testimonialsRes.data?.length) {
      testimonials = testimonialsRes.data.map(mapTestimonial);
      testimonialsFromDatabase = true;
    }

    if (!settingsRes.error && settingsRes.data) {
      settings = mapSiteSettings(settingsRes.data);
    }
  } catch {
    /* use defaults */
  }

  return {
    products,
    testimonials,
    settings,
    productsFromDatabase,
    testimonialsFromDatabase,
  };
}

/** Storefront: live DB products, or demo catalog when DB is empty/unavailable. */
export async function fetchProducts(): Promise<Product[]> {
  const bundle = await fetchCatalogBundle();
  return bundle.products;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) return mapProduct(data);
  } catch {
    /* fallback */
  }
  return DEFAULT_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const bundle = await fetchCatalogBundle();
  return bundle.testimonials;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const bundle = await fetchCatalogBundle();
  return bundle.settings;
}

/** Admin: only rows stored in Supabase (no demo fallback). */
export async function fetchProductsFromDatabase(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data?.length) return [];
    return data.map(mapProduct);
  } catch {
    return [];
  }
}

export async function getDatabaseProductCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}
