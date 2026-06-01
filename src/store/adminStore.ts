import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminConfig } from "@/lib/admin";

interface AdminState {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminName: adminConfig.name,

      login: (email, password) => {
        if (
          email.toLowerCase() === adminConfig.email.toLowerCase() &&
          password === adminConfig.password
        ) {
          set({ isAuthenticated: true, adminName: adminConfig.name });
          return { ok: true };
        }
        return { ok: false, error: "Invalid admin credentials" };
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "bearhug-admin" }
  )
);
