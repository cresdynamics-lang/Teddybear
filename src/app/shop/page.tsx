import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-cocoa/50">
          Loading shop…
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
