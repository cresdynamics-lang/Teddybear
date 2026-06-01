"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 bg-caramel/10">
      <div className="container-main max-w-xl text-center">
        <h2 className="font-display text-2xl md:text-3xl font-medium text-ink mb-2">
          Get 10% off your first order
        </h2>
        <p className="text-ink-muted mb-6">Join our community of gift-givers across Kenya.</p>

        {submitted ? (
          <p className="text-caramel font-semibold">🧸 Welcome! Check your inbox for your discount code.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary shrink-0">
              Claim Discount
            </button>
          </form>
        )}
        <p className="text-xs text-ink-light mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
