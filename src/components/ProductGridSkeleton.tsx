export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-2xl bg-blush/30 mb-3" />
          <div className="h-4 bg-blush/20 rounded-lg w-3/4 mb-2" />
          <div className="h-3 bg-blush/15 rounded-lg w-1/2" />
        </div>
      ))}
    </div>
  );
}
