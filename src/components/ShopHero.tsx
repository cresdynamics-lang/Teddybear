import Link from "next/link";

interface Props {
  title?: string;
  subtitle?: string;
}

export default function ShopHero({
  title = "Shop Teddy Bears",
  subtitle = "Mini plush to 140cm life-size giants — soft, cuddly teddy bears delivered across Nairobi.",
}: Props) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-plum-dark via-plum to-plum-light text-white py-14 md:py-20">
      <div className="absolute inset-0 bg-grain opacity-25" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-honey/20 rounded-full blur-3xl" />
      <div className="absolute -left-10 bottom-0 w-60 h-60 bg-sage/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="text-sm text-white/50 mb-4">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">Teddy Bears</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 max-w-xl">
          {title}
        </h1>
        <p className="text-white/75 text-lg max-w-2xl">{subtitle}</p>
      </div>
    </div>
  );
}
