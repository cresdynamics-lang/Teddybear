"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getCurrentUser, getWishlistProductIds } from "@/lib/actions/auth";
import { checkIsAdmin } from "@/lib/actions/admin";
import { linkOrdersToUserByPhone } from "@/lib/actions/orders";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type LoadAuthOptions = {
  /** Skip wishlist sync and order linking on admin routes. */
  adminLight?: boolean;
};

/** Load Supabase session into Zustand; retries while cookies propagate after sign-in. */
export async function loadAuthIntoStore(attempts = 4, opts?: LoadAuthOptions): Promise<boolean> {
  const { setUser, setIsAdmin, clear, setLoaded } = useAuthStore.getState();
  const setWishlistIds = useWishlistStore.getState().setIds;
  const guestWishlistIds = [...useWishlistStore.getState().ids];

  if (!isSupabaseConfigured()) {
    setLoaded(true);
    return false;
  }

  const supabase = createClient();

  for (let i = 0; i < attempts; i++) {
    try {
      await supabase.auth.getSession();
      const user = await getCurrentUser();
      if (user) {
        if (opts?.adminLight) {
          const isAdmin = await checkIsAdmin();
          setUser(user);
          setIsAdmin(isAdmin);
          return true;
        }
        await linkOrdersToUserByPhone();
        const [isAdmin, serverWishlistIds] = await Promise.all([
          checkIsAdmin(),
          getWishlistProductIds(),
        ]);
        setUser(user);
        setIsAdmin(isAdmin);
        const mergedWishlist = Array.from(
          new Set([...serverWishlistIds, ...guestWishlistIds])
        );
        setWishlistIds(mergedWishlist);
        return true;
      }
    } catch {
      /* retry */
    }
    if (i < attempts - 1) await delay(80 + i * 120);
  }

  clear();
  setWishlistIds([]);
  return false;
}

export function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
    return "Incorrect email or password. Check your details or reset your password.";
  }
  if (m.includes("email not confirmed")) {
    return "Please confirm your email first, then sign in again.";
  }
  if (m.includes("too many requests") || m.includes("rate limit")) {
    return "Too many attempts. Wait a minute and try again.";
  }
  if (m.includes("network") || m.includes("fetch")) {
    return "Connection issue. Check your internet and try again.";
  }
  return message;
}
