export default function ProductDetailSkeleton() {
  return (
    <div className="container-main py-10 md:py-14 animate-pulse">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-blush/30 to-caramel/10 skeleton-shimmer" />
        <div className="space-y-5">
          <div className="h-4 w-24 rounded-full bg-caramel/10 skeleton-shimmer" />
          <div className="h-10 w-4/5 rounded-xl bg-caramel/15 skeleton-shimmer" />
          <div className="h-5 w-full rounded-lg bg-caramel/5 skeleton-shimmer" />
          <div className="h-5 w-3/4 rounded-lg bg-caramel/5 skeleton-shimmer" />
          <div className="h-12 w-36 rounded-xl bg-caramel/20 skeleton-shimmer mt-4" />
          <div className="flex gap-3 pt-4">
            <div className="h-12 flex-1 rounded-full bg-caramel/15 skeleton-shimmer" />
            <div className="h-12 w-12 rounded-full bg-caramel/10 skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
