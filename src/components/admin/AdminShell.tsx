"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCatalogStore } from "@/store/catalogStore";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
  productCount = 0,
}: {
  children: React.ReactNode;
  productCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const authLoaded = useAuthStore((s) => s.loaded);
  const user = useAuthStore((s) => s.user);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useLayoutEffect(() => {
    useCatalogStore.setState({ catalogProductCount: productCount });
  }, [productCount]);

  useEffect(() => {
    if (!authLoaded || isLoginPage) return;
    if (!user && !isAdmin) {
      router.replace("/admin/login");
    }
  }, [authLoaded, user, isAdmin, isLoginPage, router]);

  useEffect(() => {
    if (!authLoaded || !isLoginPage) return;
    if (isAdmin) router.replace("/admin");
  }, [authLoaded, isAdmin, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4 md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-lg text-ink hover:bg-gray-100 transition-colors"
            aria-label="Open admin menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-semibold text-ink text-sm md:text-base">BearHug Admin</span>
          <Link
            href="/"
            target="_blank"
            className="p-2.5 rounded-lg text-ink-muted hover:text-violet hover:bg-gray-100 transition-colors"
            aria-label="View store"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
