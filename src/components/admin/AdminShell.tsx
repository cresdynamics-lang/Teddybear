"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { checkIsAdmin } from "@/lib/actions/admin";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const authLoaded = useAuthStore((s) => s.loaded);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!authLoaded) return;

    async function verify() {
      if (isLoginPage) {
        const ok = await checkIsAdmin();
        if (ok) router.replace("/admin");
        setChecking(false);
        return;
      }

      const ok = await checkIsAdmin();
      setAllowed(ok);
      setChecking(false);
      if (!ok) router.replace("/admin/login");
    }

    verify();
  }, [authLoaded, isLoginPage, router, isAdmin]);

  if (!authLoaded || checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-ink-muted">
        Loading admin…
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64 pt-14 lg:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
