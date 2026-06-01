import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
import PageLoader from "@/components/PageLoader";

export const metadata = {
  title: "Shop Bears | BearHug KE",
  description: "Browse our collection of premium teddy bears for every occasion.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<PageLoader label="Opening the shop…" compact />}>
      <ShopClient />
    </Suspense>
  );
}
