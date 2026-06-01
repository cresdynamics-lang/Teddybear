"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { useCatalogStore } from "@/store/catalogStore";

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useCatalogStore((s) => s.addProduct);

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-caramel mb-6"
      >
        <ChevronLeft className="w-4 h-4" /> Back to products
      </Link>
      <h1 className="text-2xl font-display font-semibold text-ink mb-6">Add New Product</h1>
      <ProductForm
        submitLabel="Create Product"
        onCancel={() => router.push("/admin/products")}
        onSubmit={(data) => {
          addProduct(data);
          router.push("/admin/products");
        }}
      />
    </div>
  );
}
