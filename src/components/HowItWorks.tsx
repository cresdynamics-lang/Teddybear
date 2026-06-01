export function HowItWorks() {
  const steps = [
    {
      num: "1",
      emoji: "🧸",
      title: "Choose your bear",
      desc: "Browse our curated collection of premium plush bears.",
    },
    {
      num: "2",
      emoji: "💌",
      title: "Add a personalised message",
      desc: "Include a heartfelt note or custom embroidery.",
    },
    {
      num: "3",
      emoji: "🚚",
      title: "We deliver to their door",
      desc: "Same-day in Nairobi. Countrywide in 2–3 days.",
    },
  ];

  return (
    <section className="py-16 md:py-24 container-main">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-ink">How it works</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-card text-center"
          >
            <span className="text-4xl mb-4 block">{step.emoji}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Step {step.num}
            </span>
            <h3 className="font-display text-xl font-medium mt-2 mb-2">{step.title}</h3>
            <p className="text-sm text-ink-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
