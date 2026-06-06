"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapOrder } from "@/lib/supabase/mappers";
import type { Order, OrderStatus, User } from "@/types/order";
import type { CartLineItem } from "@/types/product";
import type { OrderShipping, PaymentMethod } from "@/types/order";
import { generateOrderId } from "@/types/order";
import { normalizePhone } from "@/lib/validators";

const MAX_ORDER_ID_ATTEMPTS = 8;

export async function createOrder(payload: {
  items: CartLineItem[];
  shipping: OrderShipping;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  giftWrap: boolean;
  total: number;
}): Promise<Order> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const phone = normalizePhone(payload.shipping.phone);

  const row = {
    user_id: user?.id ?? null,
    phone,
    status: "received" as const,
    subtotal: payload.subtotal,
    delivery_fee: payload.deliveryFee,
    gift_wrap: payload.giftWrap,
    total: payload.total,
    payment_method: payload.paymentMethod,
    shipping: { ...payload.shipping, phone },
    items: payload.items,
  };

  let lastError: string | null = null;

  for (let attempt = 0; attempt < MAX_ORDER_ID_ATTEMPTS; attempt++) {
    const orderId = generateOrderId();
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...row, id: orderId })
      .select()
      .single();

    if (!error && data) {
      revalidatePath("/orders");
      revalidatePath("/admin/orders");
      return mapOrder(data);
    }

    if (error?.code === "23505") continue;
    lastError = error?.message ?? "Could not create order";
    break;
  }

  throw new Error(lastError ?? "Could not create order. Please try again.");
}

/** Guest-safe tracking: validates order id + phone via service role (no broad exposure). */
export async function fetchOrderByRef(orderNumber: string, phone: string): Promise<Order | null> {
  const id = orderNumber.trim().toUpperCase();
  const normalized = normalizePhone(phone);
  if (!id || !normalized) return null;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("orders")
      .select("*")
      .eq("id", id)
      .eq("phone", normalized)
      .maybeSingle();

    if (error || !data) return null;
    return mapOrder(data);
  } catch {
    return null;
  }
}

export async function fetchOrderById(orderId: string): Promise<Order | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") return null;

  const admin = createAdminClient();
  const { data, error } = await admin.from("orders").select("*").eq("id", orderId).maybeSingle();
  if (error || !data) return null;
  return mapOrder(data);
}

/** Attach guest orders (same phone) when a customer signs in. */
export async function linkOrdersToUserByPhone(): Promise<number> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data: profile } = await supabase
    .from("profiles")
    .select("phone")
    .eq("id", user.id)
    .maybeSingle();

  const phone = profile?.phone ? normalizePhone(profile.phone) : "";
  if (!phone) return 0;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("orders")
      .update({ user_id: user.id })
      .is("user_id", null)
      .eq("phone", phone)
      .select("id");

    if (error) return 0;
    if ((data?.length ?? 0) > 0) {
      revalidatePath("/orders");
      revalidatePath("/account");
    }
    return data?.length ?? 0;
  } catch {
    return 0;
  }
}

export async function fetchUserOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map(mapOrder);
}

export type AdminDashboardStats = {
  orderCount: number;
  customerCount: number;
  pendingCount: number;
  totalRevenue: number;
  recentOrders: Order[];
};

/** Lightweight dashboard stats — avoids loading full order payloads on every visit. */
export async function adminDashboardStats(): Promise<AdminDashboardStats> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      orderCount: 0,
      customerCount: 0,
      pendingCount: 0,
      totalRevenue: 0,
      recentOrders: [],
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return {
      orderCount: 0,
      customerCount: 0,
      pendingCount: 0,
      totalRevenue: 0,
      recentOrders: [],
    };
  }

  const admin = createAdminClient();
  const [
    { count: orderCount },
    { count: customerCount },
    { count: pendingCount },
    { data: totals },
    { data: recent },
  ] = await Promise.all([
    admin.from("orders").select("*", { count: "exact", head: true }),
    admin.from("profiles").select("*", { count: "exact", head: true }).eq("role", "customer"),
    admin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .neq("status", "delivered"),
    admin.from("orders").select("total"),
    admin
      .from("orders")
      .select("id, total, status, shipping, created_at, items, subtotal, delivery_fee, gift_wrap, payment_method, phone, user_id")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalRevenue = (totals ?? []).reduce((sum, row) => sum + (row.total ?? 0), 0);

  return {
    orderCount: orderCount ?? 0,
    customerCount: customerCount ?? 0,
    pendingCount: pendingCount ?? 0,
    totalRevenue,
    recentOrders: (recent ?? []).map(mapOrder),
  };
}

export async function fetchAllOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return fetchUserOrders();
  }

  const admin = createAdminClient();
  const { data, error } = await admin.from("orders").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map(mapOrder);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (profile?.role !== "admin") throw new Error("Admin access required");

  const { error } = await admin.from("orders").update({ status }).eq("id", orderId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/orders");
  revalidatePath("/track");
}

export async function deleteOrder(orderId: string) {
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (profile?.role !== "admin") throw new Error("Admin access required");

  const { error } = await admin.from("orders").delete().eq("id", orderId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function fetchAllCustomers(): Promise<User[]> {
  const supabase = await createClient();
  const admin = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (profile?.role !== "admin") throw new Error("Admin access required");

  const { data, error } = await admin
    .from("profiles")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    phone: p.phone ?? "",
    email: "",
  }));
}
