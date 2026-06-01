"use client";

import { useState } from "react";
import { Loader2, Smartphone, CreditCard } from "lucide-react";
import { formatKES } from "@/lib/format";

type MpesaState = "idle" | "waiting" | "success";

interface MpesaButtonProps {
  amount: number;
  onSuccess?: () => void;
  className?: string;
}

export default function MpesaButton({ amount, onSuccess, className = "" }: MpesaButtonProps) {
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<MpesaState>("idle");

  const handleSend = () => {
    if (!phone || phone.length < 10) return;
    setState("waiting");
    setTimeout(() => {
      setState("success");
      onSuccess?.();
    }, 3000);
  };

  if (state === "success") {
    return (
      <div className="rounded-2xl bg-mpesa/10 border border-mpesa/30 p-6 text-center">
        <p className="text-mpesa font-semibold text-lg">✓ Payment received!</p>
        <p className="text-sm text-ink-muted mt-1">Thank you for your order.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="rounded-2xl border border-mpesa/20 bg-mpesa/5 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-mpesa flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-ink">Lipa Na M-Pesa</p>
            <p className="text-sm text-ink-muted">Pay {formatKES(amount)} via STK Push</p>
          </div>
        </div>

        {state === "waiting" ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <Loader2 className="w-8 h-8 text-mpesa animate-spin" />
            <p className="text-sm font-medium text-ink">Waiting for payment…</p>
            <p className="text-xs text-ink-muted">Check your phone and enter M-Pesa PIN</p>
          </div>
        ) : (
          <>
            <input
              type="tel"
              placeholder="+254 7XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field mb-3"
            />
            <button type="button" onClick={handleSend} className="btn-mpesa w-full">
              Send M-Pesa Request
            </button>
          </>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-cream px-3 text-ink-muted">or pay with card</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-full border border-ink/15 text-sm font-medium hover:bg-white transition-colors"
      >
        <CreditCard className="w-4 h-4" />
        Visa / Mastercard
      </button>
    </div>
  );
}
