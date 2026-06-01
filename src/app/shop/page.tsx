import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export const metadata = {
  title: "Shop Bears | BearHug KE",
  description: "Browse our collection of premium teddy bears for every occasion.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-main py-16 text-center">Loading shop…</div>}>
      <ShopClient />
    </Suspense>
  );
}
