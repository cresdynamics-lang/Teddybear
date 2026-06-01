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

  const orderId = generateOrderId();
  const phone = normalizePhone(payload.shipping.phone);

  const row = {
    id: orderId,
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

  const { data, error } = await supabase.from("orders").insert(row).select().single();
  if (error) throw new Error(error.message);

  revalidatePath("/orders");
  revalidatePath("/admin/orders");
  return mapOrder(data);
}

export async function fetchOrderByRef(orderNumber: string, phone: string): Promise<Order | null> {
  const supabase = await createClient();
  const normalized = normalizePhone(phone);

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderNumber.trim())
    .eq("phone", normalized)
    .maybeSingle();

  if (error || !data) return null;
  return mapOrder(data);
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

export async function fetchAllOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (profile?.role !== "admin") {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    return (data ?? []).map(mapOrder);
  }

  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
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
