import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLineItem } from "@/types/product";
import type { Order, OrderShipping, PaymentMethod, User } from "@/types/order";
import { generateOrderId, orderStatusIndex } from "@/types/order";
import { normalizePhone } from "@/lib/validators";

interface StoredCredential {
  userId: string;
  password: string;
}

interface AuthState {
  user: User | null;
  orders: Order[];
  credentials: Record<string, StoredCredential>;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => { ok: boolean; error?: string };
  logout: () => void;
  placeOrder: (payload: {
    items: CartLineItem[];
    shipping: OrderShipping;
    paymentMethod: PaymentMethod;
    subtotal: number;
    deliveryFee: number;
    giftWrap: boolean;
    total: number;
  }) => Order;
  getOrderByRef: (orderNumber: string, phone: string) => Order | undefined;
  updateProfile: (data: Partial<Pick<User, "name" | "phone">>) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  deleteOrder: (orderId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      credentials: {},

      login: (email, password) => {
        const cred = get().credentials[email.toLowerCase()];
        if (!cred || cred.password !== password) {
          return { ok: false, error: "Invalid email or password" };
        }
        const users = getStoredUsers();
        const user = users.find((u) => u.id === cred.userId);
        if (!user) return { ok: false, error: "Account not found" };
        set({ user });
        return { ok: true };
      },

      register: ({ name, email, phone, password }) => {
        const key = email.toLowerCase();
        if (get().credentials[key]) {
          return { ok: false, error: "An account with this email already exists" };
        }
        const user: User = {
          id: `user-${Date.now()}`,
          name,
          email: key,
          phone: normalizePhone(phone),
        };
        const users = getStoredUsers();
        users.push(user);
        saveUsers(users);
        set((state) => ({
          user,
          credentials: {
            ...state.credentials,
            [key]: { userId: user.id, password },
          },
        }));
        return { ok: true };
      },

      logout: () => set({ user: null }),

      placeOrder: (payload) => {
        const order: Order = {
          id: generateOrderId(),
          userId: get().user?.id,
          phone: normalizePhone(payload.shipping.phone),
          status: "received",
          createdAt: new Date().toISOString(),
          total: payload.total,
          subtotal: payload.subtotal,
          deliveryFee: payload.deliveryFee,
          giftWrap: payload.giftWrap,
          items: payload.items,
          shipping: {
            ...payload.shipping,
            phone: normalizePhone(payload.shipping.phone),
          },
          paymentMethod: payload.paymentMethod,
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },

      getOrderByRef: (orderNumber, phone) => {
        const normalized = normalizePhone(phone);
        return get().orders.find(
          (o) =>
            o.id.toLowerCase() === orderNumber.trim().toLowerCase() &&
            o.phone === normalized
        );
      },

      updateProfile: (data) => {
        const user = get().user;
        if (!user) return;
        const updated = { ...user, ...data };
        const users = getStoredUsers().map((u) => (u.id === user.id ? updated : u));
        saveUsers(users);
        set({ user: updated });
      },

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        })),

      deleteOrder: (orderId) =>
        set((state) => ({ orders: state.orders.filter((o) => o.id !== orderId) })),
    }),
    {
      name: "bearhug-auth",
      partialize: (state) => ({
        user: state.user,
        orders: state.orders,
        credentials: state.credentials,
      }),
    }
  )
);

const USERS_KEY = "bearhug-users";

function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as User[];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getAllRegisteredUsers(): User[] {
  return getStoredUsers();
}

export function getOrderProgress(status: Order["status"]): number {
  return orderStatusIndex(status);
}

/** Demo: advance order status for showcase */
export function demoAdvanceOrder(order: Order): Order {
  const steps: Order["status"][] = [
    "received",
    "packed",
    "out_for_delivery",
    "delivered",
  ];
  const idx = orderStatusIndex(order.status);
  const next = steps[Math.min(idx + 1, steps.length - 1)];
  return { ...order, status: next };
}
