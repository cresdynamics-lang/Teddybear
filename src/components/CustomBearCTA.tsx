import Link from "next/link";

export default function CustomBearCTA() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-caramel/15 via-blush/20 to-cream">
      <div className="container-main flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-caramel mb-3">
            Personalised Gifts
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-ink mb-4">
            Build a bear as unique as your story
          </h2>
          <p className="text-ink-muted mb-6 max-w-lg">
            Choose size, colour, accessories, and embroidery. Watch your custom bear come to life
            step by step — delivered anywhere in Kenya.
          </p>
          <Link href="/custom" className="btn-primary">
            Start Building
          </Link>
        </div>
        <div className="text-[120px] md:text-[160px] leading-none select-none">🧸</div>
      </div>
    </section>
  );
}
