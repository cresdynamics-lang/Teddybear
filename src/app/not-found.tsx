import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl mb-4 animate-float">🧸</p>
      <h1 className="font-display text-4xl font-bold text-cocoa mb-3">
        Page not found
      </h1>
      <p className="text-cocoa/55 max-w-md mb-8">
        This page wandered off like a lost teddy. Let&apos;s get you back to the
        bears.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/shop" className="btn-secondary">
          Shop teddy bears
        </Link>
      </div>
    </div>
  );
}
