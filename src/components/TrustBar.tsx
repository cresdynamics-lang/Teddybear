"use client";

import { Shield, Truck, Headphones, Smartphone } from "lucide-react";
import { useSiteSettings } from "@/hooks/useCatalog";
import { site } from "@/lib/site";

export default function TrustBar() {
  const settings = useSiteSettings();
  const till = settings.mpesaTill || site.mpesa.till;

  const features = [
    { icon: Truck, title: "Countrywide delivery", desc: "Same-day Nairobi · 2–3 days nationwide" },
    { icon: Smartphone, title: "M-Pesa accepted", desc: `Pay via Till ${till}` },
    { icon: Headphones, title: "WhatsApp support", desc: "Fast replies · Order help" },
    { icon: Shield, title: "Quality guaranteed", desc: "Premium plush · Gift-ready packaging" },
  ];

  return (
    <section className="py-12 md:py-14 border-y border-caramel/10 bg-white">
      <div className="container-main">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="w-11 h-11 rounded-2xl bg-caramel/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-ink text-sm mb-1">{title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
