const items = [
  "🧸 Giant teddy bears up to 140cm",
  "🐻 Classic, big & life-size plush",
  "🚚 Same-day Nairobi delivery",
  "💳 M-Pesa · Card · Cash on delivery",
  "✏️ Name embroidery available",
  "⭐ 500+ happy customers",
  "🎀 Free gift wrap on teddy orders",
  "📍 Pickup at Yala Towers CBD",
];

export default function TrustMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-brand-100/80 bg-white/50 overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="mx-8 text-sm font-semibold text-cocoa/55 tracking-wide"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
