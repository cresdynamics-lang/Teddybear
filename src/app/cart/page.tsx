"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Gift, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatKES } from "@/lib/format";
import { site } from "@/lib/site";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const {
    items,
    giftWrap,
    toggleGiftWrap,
    updateQuantity,
    removeItem,
    subtotal,
    deliveryFee,
    total,
  } = useCartStore();

  const sub = subtotal();
  const delivery = deliveryFee();
  const tot = total();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Discover handpicked teddy bears — perfect for birthdays, anniversaries, and surprises across Kenya."
        actionLabel="Shop bears"
        actionHref="/shop"
        secondaryLabel="Track an order"
        secondaryHref="/track"
      />
    );
  }

  return (
    <div className="container-main py-8 md:py-12">
      <h1 className="font-display text-3xl font-medium mb-2">Shopping Cart</h1>
      <p className="text-ink-muted text-sm mb-8">{items.length} item(s) in your cart</p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-4 shadow-card">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-blush/20">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium line-clamp-1">{item.name}</h2>
                <p className="text-sm text-ink-muted">
                  Size {item.size} · {item.color}
                </p>
                <p className="text-caramel font-semibold mt-1">{formatKES(item.price)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-9 h-9 rounded-full border border-caramel/20 flex items-center justify-center hover:bg-caramel/5"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-9 h-9 rounded-full border border-caramel/20 flex items-center justify-center hover:bg-caramel/5"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-sm text-ink-light hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-white rounded-2xl p-6 shadow-card h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-medium mb-4">Order Summary</h2>
          <label className="flex items-center gap-3 cursor-pointer mb-4 p-3 rounded-xl border border-caramel/10 hover:bg-caramel/5 transition-colors">
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={toggleGiftWrap}
              className="w-5 h-5 accent-caramel"
            />
            <Gift className="w-4 h-4 text-caramel shrink-0" />
            <span className="text-sm">Gift wrapping (+{formatKES(site.delivery.giftWrapFee)})</span>
          </label>
          <div className="space-y-2 text-sm border-t border-caramel/10 pt-4">
            <div className="flex justify-between">
              <span className="text-ink-muted">Subtotal</span>
              <span>{formatKES(sub)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-muted">Delivery</span>
              <span className="font-medium">{delivery === 0 ? "Free" : formatKES(delivery)}</span>
            </div>
            {sub < site.delivery.freeThreshold && (
              <p className="text-xs text-caramel bg-caramel/10 rounded-lg px-3 py-2">
                Add {formatKES(site.delivery.freeThreshold - sub)} more for free delivery
              </p>
            )}
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-caramel/10">
              <span>Total</span>
              <span className="text-caramel">{formatKES(tot)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-mpesa w-full mt-6 text-center block">
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block text-center text-sm text-ink-muted mt-4 hover:text-caramel transition-colors"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
