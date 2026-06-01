"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { formatKES } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  received: "Order Received",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const STATUS_COLORS: Record<string, string> = {
  received: "bg-amber-100 text-amber-800",
  packed: "bg-blue-100 text-blue-800",
  out_for_delivery: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((s) => s.user);
  const orders = useAuthStore((s) => s.orders);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const myOrders = user
    ? orders.filter((o) => !o.userId || o.userId === user.id)
    : orders;

  if (myOrders.length === 0) {
    return (
      <div className="container-main py-16 text-center max-w-md mx-auto">
        <Package className="w-12 h-12 text-caramel mx-auto mb-4" />
        <h1 className="font-display text-2xl font-medium mb-2">No orders yet</h1>
        <p className="text-ink-muted mb-6">
          {user
            ? "Your order history will appear here after your first purchase."
            : "Sign in or place an order to see your history."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">
            Shop Bears
          </Link>
          {!user && (
            <Link href="/login" className="btn-outline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-medium mb-2">My Orders</h1>
      <p className="text-ink-muted mb-8">{myOrders.length} order(s)</p>

      <div className="space-y-4">
        {myOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-card">
            <div className="flex flex-wrap justify-between gap-3 mb-4">
              <div>
                <p className="font-semibold text-caramel">{order.id}</p>
                <p className="text-xs text-ink-muted">
                  {new Date(order.createdAt).toLocaleString("en-KE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">{formatKES(order.total)}</p>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                    STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-700"
                  }`}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 shrink-0 bg-cream rounded-xl p-2">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-medium line-clamp-1 max-w-[120px]">{item.name}</p>
                    <p className="text-xs text-ink-muted">×{item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-caramel/10 text-sm text-ink-muted">
              <span>{order.paymentMethod.toUpperCase()}</span>
              <span>·</span>
              <span>{order.shipping.county}</span>
              <span>·</span>
              <Link href="/track" className="text-caramel font-medium hover:underline ml-auto">
                Track order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
