"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Gift } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatKES } from "@/lib/format";
import { site } from "@/lib/site";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, giftWrap, toggleGiftWrap, subtotal, deliveryFee, total } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const sub = subtotal();
  const delivery = deliveryFee();
  const tot = total();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[70]"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[80] flex flex-col shadow-elevated"
          >
            <div className="flex items-center justify-between p-4 border-b border-caramel/10">
              <h2 className="font-display text-xl font-semibold">Your Cart</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="p-2 rounded-full hover:bg-caramel/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-ink-muted">
                  <p className="text-6xl mb-4">🧸</p>
                  <p>Your cart is empty</p>
                  <Link href="/shop" onClick={() => setOpen(false)} className="btn-primary mt-4 inline-flex">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-white rounded-xl p-3 shadow-card">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-ink-muted">
                        Size {item.size} · {item.color}
                      </p>
                      <p className="text-sm font-semibold text-caramel mt-1">
                        {formatKES(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-caramel/20 flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-caramel/20 flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-ink-light hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-caramel/10 p-4 space-y-4 bg-white">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={toggleGiftWrap}
                    className="w-5 h-5 rounded accent-caramel"
                  />
                  <Gift className="w-4 h-4 text-caramel" />
                  <span className="text-sm">
                    Gift wrapping (+{formatKES(site.delivery.giftWrapFee)})
                  </span>
                </label>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Subtotal</span>
                    <span>{formatKES(sub)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Delivery</span>
                    <span>{delivery === 0 ? "Free" : formatKES(delivery)}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Gift wrap</span>
                      <span>{formatKES(site.delivery.giftWrapFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-caramel/10">
                    <span>Total</span>
                    <span className="text-caramel">{formatKES(tot)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className="btn-mpesa w-full text-center"
                >
                  Proceed to Checkout
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full text-center text-sm text-ink-muted hover:text-caramel"
                >
                  <Link href="/shop">Continue Shopping</Link>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
