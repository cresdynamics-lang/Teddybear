export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-blush/30 via-cream-dark to-caramel/10 skeleton-shimmer" />
      <div className="mt-3 space-y-2">
        <div className="h-4 rounded-lg bg-caramel/10 w-4/5 skeleton-shimmer" />
        <div className="h-3 rounded-lg bg-caramel/5 w-1/2 skeleton-shimmer" />
        <div className="h-5 rounded-lg bg-caramel/15 w-1/3 skeleton-shimmer" />
      </div>
    </div>
  );
}
