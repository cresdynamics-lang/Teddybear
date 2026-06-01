"use client";

import { useState } from "react";
import { MapPin, MessageCircle, Phone, Mail, CreditCard, ArrowUpRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { toastSuccess } from "@/store/toastStore";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Hi BearHug KE,`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      ``,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
    toastSuccess("Opening WhatsApp — send the message to reach us instantly.");
  };

  return (
    <div>
      <div className="bg-blush/20 border-b border-caramel/10">
        <div className="container-main py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-caramel mb-4">
            Get in touch
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-ink mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-xl">
            Need help choosing the right size? WhatsApp us for the fastest reply — we typically
            respond within minutes.
          </p>
        </div>
      </div>

      <div className="container-main py-14 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: MessageCircle,
                title: "WhatsApp (fastest)",
                body: (
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-caramel font-semibold hover:underline"
                  >
                    Open WhatsApp <ArrowUpRight className="w-4 h-4" />
                  </a>
                ),
              },
              {
                icon: Phone,
                title: "Phone",
                body: (
                  <a href={`tel:+${site.whatsapp}`} className="text-ink-muted hover:text-ink transition">
                    {site.phoneDisplay}
                  </a>
                ),
              },
              {
                icon: MapPin,
                title: "Showroom",
                body: (
                  <>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    <span className="text-ink-light text-sm">{site.hours}</span>
                  </>
                ),
              },
              {
                icon: CreditCard,
                title: "M-Pesa Till",
                body: site.mpesa.till,
              },
              {
                icon: Mail,
                title: "Email",
                body: (
                  <a href={`mailto:${site.email}`} className="text-ink-muted hover:text-ink transition">
                    {site.email}
                  </a>
                ),
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl bg-white shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-caramel/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-caramel" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-semibold text-ink text-sm mb-1">{title}</h2>
                  <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-10">
              {sent ? (
                <div className="text-center py-12">
                  <p className="text-5xl mb-5">🧸</p>
                  <h2 className="font-display text-2xl font-medium text-ink mb-2">Almost done!</h2>
                  <p className="text-ink-muted mb-6">
                    Send the pre-filled message in WhatsApp and our team will reply shortly.
                  </p>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Open WhatsApp again
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-medium text-ink mb-2">Send a message</h2>
                  <p className="text-ink-muted text-sm mb-8">
                    Tell us the occasion, preferred size, and colour — we&apos;ll recommend the perfect
                    bear. Submitting opens WhatsApp with your details ready to send.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        placeholder="Your name"
                        aria-label="Name"
                      />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-field"
                      placeholder="Phone (07XX XXX XXX)"
                      aria-label="Phone"
                    />
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="input-field resize-none"
                      placeholder="Which teddy bear size or colour do you need? Any name for embroidery?"
                      aria-label="Message"
                    />
                    <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl overflow-hidden h-80 shadow-card">
          <iframe
            title="BearHug KE location"
            src="https://maps.google.com/maps?q=Yala+Towers+Nairobi+CBD&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
