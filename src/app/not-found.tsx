import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl mb-4">🧸</p>
      <h1 className="font-display text-4xl font-medium text-ink mb-3">Page not found</h1>
      <p className="text-ink-muted max-w-md mb-8">
        This page wandered off like a lost teddy. Let&apos;s get you back to the bears.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/shop" className="btn-outline">
          Shop bears
        </Link>
      </div>
    </div>
  );
}
