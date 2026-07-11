"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-coral-100)] text-[var(--color-coral-500)] mb-4">
          <AlertTriangle size={22} />
        </span>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink-900)]">
          Something went wrong
        </h2>
        <p className="mt-1.5 text-sm text-[var(--color-ink-500)]">
          Currentwork hit an unexpected error loading this page.
        </p>
        <button
          onClick={reset}
          className="mt-5 rounded-full bg-[var(--color-flow-500)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-flow-600)] transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}