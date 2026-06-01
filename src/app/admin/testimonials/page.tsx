"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useCatalogStore } from "@/store/catalogStore";
import {
  adminCreateTestimonial,
  adminDeleteTestimonial,
  adminUpdateTestimonial,
} from "@/lib/actions/admin";
import { refreshCatalog } from "@/lib/refreshCatalog";
import { toastError, toastSuccess } from "@/store/toastStore";
import type { Testimonial } from "@/types/admin";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function AdminTestimonialsPage() {
  const testimonials = useCatalogStore((s) => s.testimonials).filter((t) => UUID_RE.test(t.id));
  const testimonialsFromDatabase = useCatalogStore((s) => s.testimonialsFromDatabase);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    rating: 5,
    quote: "",
    occasion: "Birthday",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        city: editing.city,
        rating: editing.rating,
        quote: editing.quote,
        occasion: editing.occasion,
      });
    }
  }, [editing]);

  const resetForm = () => {
    setForm({ name: "", city: "", rating: 5, quote: "", occasion: "Birthday" });
    setEditing(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminUpdateTestimonial(editing.id, form);
      } else {
        await adminCreateTestimonial(form);
      }
      await refreshCatalog();
      resetForm();
      toastSuccess(editing ? "Testimonial updated" : "Testimonial added");
    } catch (err) {
      toastError(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await adminDeleteTestimonial(id);
      await refreshCatalog();
      toastSuccess("Testimonial deleted");
    } catch (err) {
      toastError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const startEdit = (t: Testimonial) => setEditing(t);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Testimonials</h1>
        <p className="text-ink-muted text-sm mt-1">{testimonials.length} customer reviews</p>
        {!testimonialsFromDatabase && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-4">
            Showing demo reviews only. Seed your catalog in Settings to persist testimonials in Supabase.
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-card space-y-4 h-fit">
          <h2 className="font-semibold flex items-center gap-2">
            {editing ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {editing ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              required
              placeholder="Customer name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="input-field"
            />
            <input
              required
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="input-field"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
              className="input-field"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} stars</option>
              ))}
            </select>
            <input
              placeholder="Occasion"
              value={form.occasion}
              onChange={(e) => setForm((f) => ({ ...f, occasion: e.target.value }))}
              className="input-field"
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="Quote"
            value={form.quote}
            onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))}
            className="input-field resize-none"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn-primary bg-caramel">
              {editing ? "Save Changes" : "Add Testimonial"}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-5 shadow-card">
              <div className="flex justify-between items-start gap-3 mb-2">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-ink-muted">
                    {t.city} · {t.occasion} · {"★".repeat(t.rating)}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(t)}
                    className="p-2 rounded-lg hover:bg-caramel/10 text-caramel"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-ink-muted italic">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
