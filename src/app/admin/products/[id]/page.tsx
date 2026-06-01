"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { useCatalogStore } from "@/store/catalogStore";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const product = useCatalogStore((s) => s.getProductById(id));
  const updateProduct = useCatalogStore((s) => s.updateProduct);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-muted mb-4">Product not found.</p>
        <Link href="/admin/products" className="btn-primary bg-caramel">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-caramel mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Back to products
      </Link>
      <h1 className="text-2xl font-display font-semibold text-ink mb-6">Edit Product</h1>
      <ProductForm
        initial={product}
        submitLabel="Save Changes"
        onCancel={() => router.push("/admin/products")}
        onSubmit={(data) => {
          updateProduct(id, data);
          router.push("/admin/products");
        }}
      />
    </div>
  );
}
