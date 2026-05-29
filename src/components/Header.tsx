"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop Bears" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { cartCount, setCartOpen, wishlist, user } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem] gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-plum to-plum-light text-white text-lg shadow-soft group-hover:shadow-glow transition-shadow">
              🧸
            </span>
            <span className="font-display text-lg md:text-xl font-bold text-cocoa leading-tight">
              Teddy Bear
              <span className="block text-[11px] font-sans font-semibold text-plum/70 tracking-wide uppercase">
                Kenya
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  pathname === item.href
                    ? "bg-plum text-white shadow-soft"
                    : "text-cocoa/70 hover:text-plum hover:bg-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl hover:bg-white/80 text-cocoa transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/account"
              className="hidden sm:flex p-2.5 rounded-xl hover:bg-white/80 text-cocoa transition"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/shop?wishlist=1"
              className="relative p-2.5 rounded-xl hover:bg-white/80 text-cocoa transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-honey text-plum-dark text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-white/80 text-cocoa transition"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-plum text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl hover:bg-white/80"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={onSearch} className="pb-4 animate-fade-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa/35" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teddy bears by size or colour…"
                className="input-field pl-11 rounded-full"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/50 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 px-4 rounded-xl font-semibold text-cocoa hover:bg-ivory-dark hover:text-plum transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={user ? "/account" : "/login"}
            className="block py-3 px-4 rounded-xl font-semibold text-cocoa hover:bg-ivory-dark"
            onClick={() => setMenuOpen(false)}
          >
            {user ? "My Account" : "Login / Register"}
          </Link>
        </div>
      )}
    </header>
  );
}
