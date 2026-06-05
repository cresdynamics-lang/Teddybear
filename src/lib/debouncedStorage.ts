import type { StateStorage } from "zustand/middleware";

type TimerHandle = ReturnType<typeof globalThis.setTimeout>;

/** Batches localStorage writes so clicks stay responsive. */
export function createDebouncedLocalStorage(delayMs = 800): StateStorage {
  const timers = new Map<string, TimerHandle>();
  const pending = new Map<string, string>();

  const flush = (name: string) => {
    const next = pending.get(name);
    if (next !== undefined) {
      try {
        localStorage.setItem(name, next);
      } catch {
        /* quota */
      }
    }
    pending.delete(name);
    timers.delete(name);
  };

  const schedule = (name: string, value: string) => {
    pending.set(name, value);
    const existing = timers.get(name);
    if (existing !== undefined) clearTimeout(existing);

    const run = () => flush(name);
    const fire = () => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(run, { timeout: delayMs + 200 });
      } else {
        run();
      }
    };

    timers.set(name, globalThis.setTimeout(fire, delayMs));
  };

  return {
    getItem: (name) => {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(name);
    },
    setItem: (name, value) => {
      if (typeof window === "undefined") return;
      schedule(name, value);
    },
    removeItem: (name) => {
      if (typeof window === "undefined") return;
      const t = timers.get(name);
      if (t !== undefined) clearTimeout(t);
      timers.delete(name);
      pending.delete(name);
      localStorage.removeItem(name);
    },
  };
}
