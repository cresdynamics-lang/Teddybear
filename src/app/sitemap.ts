import type { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/actions/catalog";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const products = await fetchProducts();
    productPages = products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: p.createdAt ? new Date(p.createdAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    productPages = [];
  }

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/custom`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/track`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/checkout`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...productPages,
  ];
}
