import { products } from "@/lib/products";
import ProductPageClient from "@/components/ProductPageClient";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | BearHug KE`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductPageClient slug={params.slug} />;
}
