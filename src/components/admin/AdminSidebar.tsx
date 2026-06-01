"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { signOutUser } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-ink text-cream h-14 flex items-center justify-between px-4 border-b border-cream/10">
        <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-display font-semibold text-sm">BearHug Admin</span>
        <Link href="/" target="_blank" aria-label="View store">
          <ExternalLink className="w-5 h-5" />
        </Link>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-ink text-cream z-50 flex flex-col transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-cream/10 flex items-center justify-between">
          <div>
            <p className="font-display font-semibold">BearHug Admin</p>
            <p className="text-xs text-cream/50 mt-0.5">{user?.name ?? user?.email ?? "Admin"}</p>
          </div>
          <button
            type="button"
            className="lg:hidden p-1"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(href, exact)
                  ? "bg-caramel text-white"
                  : "text-cream/70 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-cream/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/70 hover:bg-cream/10 hover:text-cream"
          >
            <ExternalLink className="w-4 h-4" />
            View Store
          </Link>
          <button
            type="button"
            onClick={async () => {
              await signOutUser();
              clear();
              router.push("/admin/login");
              router.refresh();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/70 hover:bg-red-900/30 hover:text-red-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
