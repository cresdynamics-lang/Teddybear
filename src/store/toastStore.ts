import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

let toastCounter = 0;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  push: (toast) => {
    const id = `toast-${++toastCounter}-${Date.now()}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

    setTimeout(() => {
      get().dismiss(id);
    }, 4500);
  },

  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function toastSuccess(message: string) {
  useToastStore.getState().push({ type: "success", message });
}

export function toastError(message: string) {
  useToastStore.getState().push({ type: "error", message });
}

export function toastInfo(message: string) {
  useToastStore.getState().push({ type: "info", message });
}
