import type { CartLineItem } from "@/types/product";

export type OrderStatus = "received" | "packed" | "out_for_delivery" | "delivered";
export type DeliveryType = "same-day" | "standard";
export type PaymentMethod = "mpesa" | "card";

export interface OrderShipping {
  name: string;
  phone: string;
  email: string;
  address: string;
  county: string;
  deliveryType: DeliveryType;
  giftMessage?: string;
}

export interface Order {
  id: string;
  userId?: string;
  phone: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  subtotal: number;
  deliveryFee: number;
  giftWrap: boolean;
  items: CartLineItem[];
  shipping: OrderShipping;
  paymentMethod: PaymentMethod;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  county: string;
  deliveryType: DeliveryType;
  giftMessage?: string;
  paymentMethod: PaymentMethod;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function generateOrderId(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `BH-${num}`;
}

export function normalizeOrderId(id: string): string {
  return id.trim().toUpperCase();
}

export function orderStatusIndex(status: OrderStatus): number {
  const map: Record<OrderStatus, number> = {
    received: 0,
    packed: 1,
    out_for_delivery: 2,
    delivered: 3,
  };
  return map[status];
}

export function getOrderProgress(status: OrderStatus): number {
  return orderStatusIndex(status);
}
