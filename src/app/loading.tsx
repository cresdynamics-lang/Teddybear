export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-plum/10 flex items-center justify-center text-2xl animate-pulse">
          🧸
        </div>
        <p className="text-sm font-semibold text-cocoa/40">Loading gifts…</p>
      </div>
    </div>
  );
}
