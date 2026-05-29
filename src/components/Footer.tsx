import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-plum-dark text-white mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-honey/20 text-xl">
              🧸
            </span>
            <span className="font-display text-xl font-bold">Teddy Bear Kenya</span>
          </div>
          <p className="text-white/65 text-sm leading-relaxed">
            Kenya&apos;s dedicated teddy bear shop — mini plush to 140cm life-size
            giants. Soft, huggable, delivered across Nairobi.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-honey-light">
            Quick links
          </h3>
          <ul className="space-y-2.5 text-sm text-white/65">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop Teddy Bears" },
              { href: "/contact", label: "Contact" },
              { href: "/account", label: "My Account" },
              { href: "/orders", label: "Orders" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-honey transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold mb-4 text-honey-light">
            Visit us
          </h3>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 shrink-0 text-honey mt-0.5" />
              <span>
                Yala Towers, Biashara Street
                <br />
                4th Floor, Nairobi CBD
              </span>
            </li>
            <li className="flex gap-2">
              <Phone className="w-4 h-4 shrink-0 text-honey" />
              <a href="tel:+254700000000" className="hover:text-honey-light transition">
                +254 700 000 000
              </a>
            </li>
            <li className="flex gap-2">
              <MessageCircle className="w-4 h-4 shrink-0 text-honey" />
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-honey-light transition"
              >
                Let&apos;s Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/40">
        Copyright © {new Date().getFullYear()} Teddy Bear Kenya · Crafted with love in Nairobi
      </div>
    </footer>
  );
}
