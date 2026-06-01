import ProductPageClient from "@/components/ProductPageClient";
import { fetchProductBySlug, fetchProducts } from "@/lib/actions/catalog";
import { products as seedProducts } from "@/lib/products";

interface Props {
  params: { slug: string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const list = await fetchProducts();
    return list.map((p) => ({ slug: p.slug }));
  } catch {
    return seedProducts.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | BearHug KE" };
  return {
    title: `${product.name} | BearHug KE`,
    description: product.tagline || product.description,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.image ? [{ url: product.image }] : undefined,
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient slug={params.slug} />;
}
