"use client";

import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

const styles = {
  success: "bg-white border-green-200 text-green-900",
  error: "bg-white border-red-200 text-red-900",
  info: "bg-white border-caramel/20 text-ink",
};

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const iconColors = {
  success: "text-mpesa",
  error: "text-red-600",
  info: "text-caramel",
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 md:bottom-6 right-4 z-[200] flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-elevated toast-enter ${styles[toast.type]}`}
            role="alert"
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
            <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 opacity-60" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
