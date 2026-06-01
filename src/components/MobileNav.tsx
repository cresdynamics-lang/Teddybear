"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/cart", label: "Cart", icon: ShoppingCart, isCart: true },
];

export default function MobileNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleOpen);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-cream/95 backdrop-blur-xl border-t border-caramel/10 safe-bottom">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ href, label, icon: Icon, isCart }) => {
          const active = pathname === href || (href === "/shop" && pathname.startsWith("/shop"));
          if (isCart) {
            return (
              <button
                key={href}
                type="button"
                onClick={toggleCart}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
                  active ? "text-caramel" : "text-ink-muted"
                }`}
              >
                <span className="relative">
                  <Icon className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-caramel text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] ${
                active ? "text-caramel" : "text-ink-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
