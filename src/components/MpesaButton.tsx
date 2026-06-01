"use client";

import { Smartphone } from "lucide-react";
import { formatKES } from "@/lib/format";
import { site } from "@/lib/site";

interface MpesaButtonProps {
  amount: number;
  className?: string;
}

/** M-Pesa pay instructions — STK/card integration can be added later. */
export default function MpesaButton({ amount, className = "" }: MpesaButtonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="rounded-2xl border border-mpesa/20 bg-mpesa/5 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-mpesa flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-ink">Pay with M-Pesa</p>
            <p className="text-sm text-ink-muted">Total due: {formatKES(amount)}</p>
          </div>
        </div>
        <ol className="text-sm text-ink-muted space-y-2 list-decimal list-inside">
          <li>
            Place your order below — we&apos;ll confirm by WhatsApp or phone.
          </li>
          <li>
            Pay via <strong className="text-ink">Lipa na M-Pesa → Buy Goods</strong> till{" "}
            <strong className="text-mpesa">{site.mpesa.till}</strong> ({site.name}).
          </li>
          <li>Use your order number as the payment reference when possible.</li>
        </ol>
      </div>
      <p className="text-xs text-ink-muted text-center">
        Card payments coming soon. For now we accept M-Pesa and cash on delivery in select areas.
      </p>
    </div>
  );
}
