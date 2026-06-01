"use server";

import { createClient } from "@/lib/supabase/server";
import { mapProduct, mapSiteSettings, mapTestimonial } from "@/lib/supabase/mappers";
import type { SiteSettings, Testimonial } from "@/types/admin";
import type { Product } from "@/types/product";
import { DEFAULT_PRODUCTS, DEFAULT_TESTIMONIALS } from "@/lib/products";
import { defaultSiteSettings } from "@/store/catalogStore";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data?.length) return DEFAULT_PRODUCTS;
    return data.map(mapProduct);
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    return data ? mapProduct(data) : null;
  } catch {
    return DEFAULT_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at");

    if (error) throw error;
    if (!data?.length) return DEFAULT_TESTIMONIALS;
    return data.map(mapTestimonial);
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

    if (error) throw error;
    if (!data) return defaultSiteSettings;
    return mapSiteSettings(data);
  } catch {
    return defaultSiteSettings;
  }
}
