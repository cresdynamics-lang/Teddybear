"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export default function LoadingSpinner({
  label,
  className = "",
  size = "sm",
}: LoadingSpinnerProps) {
  const iconClass = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <span className={`inline-flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${iconClass} animate-spin text-current`} aria-hidden />
      {label ? <span>{label}</span> : null}
    </span>
  );
}
