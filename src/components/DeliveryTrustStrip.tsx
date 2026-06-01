"use client";

import { Truck, Smartphone, Gift, ShieldCheck } from "lucide-react";
import { useSiteSettings } from "@/hooks/useCatalog";
import { site } from "@/lib/site";
import { formatKES } from "@/lib/format";

export default function DeliveryTrustStrip() {
  const settings = useSiteSettings();

  const items = [
    {
      icon: Truck,
      label: `Free delivery over ${formatKES(settings.freeDeliveryThreshold)}`,
    },
    {
      icon: Smartphone,
      label: `M-Pesa Till ${settings.mpesaTill}`,
    },
    {
      icon: Gift,
      label: "Gift wrapping available",
    },
    {
      icon: ShieldCheck,
      label: "Premium quality guaranteed",
    },
  ];

  return (
    <div className="bg-ink text-cream border-b border-cream/10">
      <div className="container-main py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium">
          {items.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 text-cream/90">
              <Icon className="w-3.5 h-3.5 text-caramel shrink-0" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
