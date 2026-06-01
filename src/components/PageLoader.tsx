interface PageLoaderProps {
  label?: string;
  compact?: boolean;
}

export default function PageLoader({ label = "Loading…", compact }: PageLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-12" : "py-20 md:py-28"
      }`}
    >
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-3xl bg-blush/40 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">🧸</div>
      </div>
      <p className="text-sm font-medium text-ink-muted">{label}</p>
    </div>
  );
}
