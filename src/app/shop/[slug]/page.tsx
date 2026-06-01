import { fetchProductBySlug, fetchProducts } from "@/lib/actions/catalog";
import ProductPageClient from "@/components/ProductPageClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | BearHug KE" };
  return {
    title: `${product.name} | BearHug KE`,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient slug={params.slug} />;
}
