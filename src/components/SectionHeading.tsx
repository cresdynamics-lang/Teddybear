interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const copy = description ?? subtitle;
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-caramel mb-2">{eyebrow}</p>
      )}
      <h2 className="font-display text-2xl md:text-3xl font-medium text-ink leading-tight">{title}</h2>
      {copy && <p className="mt-2 text-ink-muted text-sm md:text-base leading-relaxed">{copy}</p>}
    </div>
  );
}
