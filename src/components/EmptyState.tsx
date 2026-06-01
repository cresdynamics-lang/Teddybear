import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function EmptyState({
  icon: Icon,
  emoji = "🧸",
  title,
  description,
  actionLabel,
  actionHref,
  secondaryLabel,
  secondaryHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 md:py-20 px-4 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-blush/30 flex items-center justify-center mx-auto mb-6">
        {Icon ? (
          <Icon className="w-10 h-10 text-caramel" strokeWidth={1.5} />
        ) : (
          <span className="text-4xl" aria-hidden>
            {emoji}
          </span>
        )}
      </div>
      <h1 className="font-display text-2xl md:text-3xl font-medium text-ink mb-3">{title}</h1>
      <p className="text-ink-muted leading-relaxed mb-8">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {actionLabel && actionHref && (
          <Link href={actionHref} className="btn-primary">
            {actionLabel}
          </Link>
        )}
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref} className="btn-outline">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
