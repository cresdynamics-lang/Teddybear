"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug, getProductPrice, products } from "@/data/products";
import type { Address, CartItem, Order, User } from "@/lib/types";

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  login: (email: string, password: string, name?: string) => boolean;
  register: (email: string, password: string, name: string, phone: string) => boolean;
  logout: () => void;
  placeOrder: (
    shipping: Address,
    paymentMethod: Order["paymentMethod"]
  ) => Order | null;
  getCartLineTotal: (item: CartItem) => number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "tbk-store-v1";

interface Persisted {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
}

function loadStore(): Persisted {
  if (typeof window === "undefined") {
    return { cart: [], wishlist: [], user: null, orders: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Persisted;
  } catch {
    /* ignore */
  }
  return { cart: [], wishlist: [], user: null, orders: [] };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [credentials, setCredentials] = useState<Record<string, string>>({});

  useEffect(() => {
    const data = loadStore();
    setCart(data.cart);
    setWishlist(data.wishlist);
    setUser(data.user);
    setOrders(data.orders);
    try {
      const creds = localStorage.getItem(STORAGE_KEY + "-auth");
      if (creds) setCredentials(JSON.parse(creds));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart, wishlist, user, orders })
    );
  }, [cart, wishlist, user, orders, hydrated]);

  const getCartLineTotal = useCallback((item: CartItem) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return 0;
    return getProductPrice(product, item.variantId) * item.quantity;
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + getCartLineTotal(item), 0),
    [cart, getCartLineTotal]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.variantId === item.variantId &&
          i.customization === item.customization
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, qty: number) => {
      if (qty < 1) {
        setCart((prev) =>
          prev.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          )
        );
        return;
      }
      setCart((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const login = useCallback(
    (email: string, password: string) => {
      const stored = credentials[email.toLowerCase()];
      if (!stored || stored !== password) return false;
      const u: User = {
        id: email.toLowerCase(),
        email: email.toLowerCase(),
        name: email.split("@")[0],
        phone: "",
      };
      setUser(u);
      return true;
    },
    [credentials]
  );

  const register = useCallback(
    (email: string, password: string, name: string, phone: string) => {
      const key = email.toLowerCase();
      if (credentials[key]) return false;
      const next = { ...credentials, [key]: password };
      setCredentials(next);
      localStorage.setItem(STORAGE_KEY + "-auth", JSON.stringify(next));
      const u: User = { id: key, email: key, name, phone };
      setUser(u);
      return true;
    },
    [credentials]
  );

  const logout = useCallback(() => setUser(null), []);

  const placeOrder = useCallback(
    (shipping: Address, paymentMethod: Order["paymentMethod"]) => {
      if (cart.length === 0) return null;
      const order: Order = {
        id: `TBK-${Date.now().toString(36).toUpperCase()}`,
        items: [...cart],
        total: cartTotal,
        status: paymentMethod === "mpesa" ? "pending" : "confirmed",
        paymentMethod,
        createdAt: new Date().toISOString(),
        shipping,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [cart, cartTotal]
  );

  const value: StoreContextValue = {
    cart,
    wishlist,
    user,
    orders,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    cartTotal,
    cartCount,
    login,
    register,
    logout,
    placeOrder,
    getCartLineTotal,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export { getProductBySlug };
