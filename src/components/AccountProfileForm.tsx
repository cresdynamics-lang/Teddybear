"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/auth";
import { notifyAuthChanged } from "@/lib/authEvents";
import { useAuthStore } from "@/store/authStore";
import { normalizePhone } from "@/lib/validators";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
});

type FormData = z.infer<typeof schema>;

export default function AccountProfileForm() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: user
      ? { name: user.name, phone: user.phone || "" }
      : { name: "", phone: "" },
  });

  if (!user) return null;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    setSaved(false);
    try {
      await updateUserProfile({
        name: data.name.trim(),
        phone: normalizePhone(data.phone),
      });
      setUser({
        ...user,
        name: data.name.trim(),
        phone: normalizePhone(data.phone),
      });
      notifyAuthChanged();
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card mb-8">
      <h2 className="font-display text-lg font-medium mb-4">Profile details</h2>
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
      )}
      {saved && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-800 text-sm">
          Profile saved successfully.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Full name</label>
          <input {...register("name")} className="input-field" autoComplete="name" />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Phone</label>
          <input {...register("phone")} className="input-field" autoComplete="tel" />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
          )}
          <p className="text-xs text-ink-muted mt-1">
            Used for order tracking and delivery updates.
          </p>
        </div>
        <p className="text-sm text-ink-muted">
          Email: <span className="text-ink">{user.email}</span>
        </p>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save profile"}
        </button>
      </form>
    </div>
  );
}
