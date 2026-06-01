"use client";

import { useState } from "react";
import { useCatalogStore, defaultSiteSettings } from "@/store/catalogStore";

export default function AdminSettingsPage() {
  const settings = useCatalogStore((s) => s.settings);
  const updateSettings = useCatalogStore((s) => s.updateSettings);
  const resetToDefaults = useCatalogStore((s) => s.resetToDefaults);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(settings);

  const update = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Store Settings</h1>
        <p className="text-ink-muted text-sm mt-1">Manage business details and delivery fees</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 shadow-card space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3 rounded-xl bg-green-50 text-green-700 text-sm">
            Settings saved successfully!
          </div>
        )}

        <section className="space-y-4">
          <h2 className="font-semibold text-ink border-b border-gray-100 pb-2">Brand</h2>
          <div>
            <label className="text-sm font-medium mb-1 block">Store Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Tagline</label>
            <input
              value={form.tagline}
              onChange={(e) => update("tagline", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Business Hours</label>
            <input
              value={form.hours}
              onChange={(e) => update("hours", e.target.value)}
              className="input-field"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-ink border-b border-gray-100 pb-2">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone Display</label>
              <input
                value={form.phoneDisplay}
                onChange={(e) => update("phoneDisplay", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">WhatsApp (254…)</label>
              <input
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-ink border-b border-gray-100 pb-2">Payments & Delivery</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">M-Pesa Till</label>
              <input
                value={form.mpesaTill}
                onChange={(e) => update("mpesaTill", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Free Delivery Threshold (KSh)</label>
              <input
                type="number"
                value={form.freeDeliveryThreshold}
                onChange={(e) => update("freeDeliveryThreshold", Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Standard Delivery Fee (KSh)</label>
              <input
                type="number"
                value={form.standardDeliveryFee}
                onChange={(e) => update("standardDeliveryFee", Number(e.target.value))}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Gift Wrap Fee (KSh)</label>
              <input
                type="number"
                value={form.giftWrapFee}
                onChange={(e) => update("giftWrapFee", Number(e.target.value))}
                className="input-field"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="btn-primary bg-caramel">
            Save Settings
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all catalog data to defaults? This cannot be undone.")) {
                resetToDefaults();
                setForm(defaultSiteSettings);
              }
            }}
            className="btn-outline text-red-600 border-red-200 hover:bg-red-50"
          >
            Reset Catalog to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
