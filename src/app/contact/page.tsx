"use client";

import { useState } from "react";
import { MapPin, MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-cocoa mb-2">
        Contact Us
      </h1>
      <p className="text-cocoa/60 mb-10">
        Need help choosing the right teddy bear size? We&apos;re here to help!
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="card p-6 flex gap-4">
            <MapPin className="w-6 h-6 text-brand-600 shrink-0" />
            <div>
              <h2 className="font-semibold mb-1">Visit our shop</h2>
              <p className="text-cocoa/70 text-sm">
                Yala Towers, Biashara Street
                <br />
                4th Floor, Nairobi CBD
                <br />
                Kenya
              </p>
              <p className="text-xs text-cocoa/50 mt-2">Mon–Sat: 9am – 6pm</p>
            </div>
          </div>

          <div className="card p-6 flex gap-4">
            <Phone className="w-6 h-6 text-brand-600 shrink-0" />
            <div>
              <h2 className="font-semibold mb-1">Call us</h2>
              <a
                href="tel:+254700000000"
                className="text-brand-600 hover:underline"
              >
                +254 700 000 000
              </a>
            </div>
          </div>

          <div className="card p-6 flex gap-4">
            <MessageCircle className="w-6 h-6 text-brand-600 shrink-0" />
            <div>
              <h2 className="font-semibold mb-1">WhatsApp</h2>
              <a
                href="https://wa.me/254700000000?text=Hi%20Teddy%20Bear%20Kenya!"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Let&apos;s Chat!
              </a>
              <p className="text-xs text-cocoa/50 mt-1">Fastest response</p>
            </div>
          </div>

          <div className="card p-6 flex gap-4">
            <Mail className="w-6 h-6 text-brand-600 shrink-0" />
            <div>
              <h2 className="font-semibold mb-1">Email</h2>
              <a
                href="mailto:hello@teddybearkenya.co.ke"
                className="text-brand-600 hover:underline"
              >
                hello@teddybearkenya.co.ke
              </a>
            </div>
          </div>
        </div>

        <div className="card p-6 md:p-8">
          {sent ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">💌</p>
              <h2 className="font-display text-xl font-bold mb-2">Message sent!</h2>
              <p className="text-cocoa/60">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-bold mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input required className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    required
                    type="email"
                    className="input-field"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="07XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Tell us which teddy bear size or colour you need…"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="mt-12 rounded-2xl overflow-hidden h-64 bg-brand-100 flex items-center justify-center text-cocoa/40">
        <p className="text-center px-4">
          📍 Map: Yala Towers, Biashara Street, Nairobi CBD
          <br />
          <span className="text-sm">(Embed Google Maps in production)</span>
        </p>
      </div>
    </div>
  );
}
