export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-mist-200)] bg-white p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[var(--color-mist-200)]" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-3/4 rounded bg-[var(--color-mist-200)]" />
          <div className="h-2.5 w-1/2 rounded bg-[var(--color-mist-100)]" />
          <div className="h-2 w-1/4 rounded bg-[var(--color-mist-100)] mt-2" />
        </div>
      </div>
    </div>
  );
}

export function BoardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-3 w-16 rounded bg-[var(--color-mist-200)] mb-3" />
        <div className="h-3 w-full rounded-full bg-[var(--color-mist-200)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((col) => (
          <div key={col} className="space-y-2.5">
            <div className="h-4 w-24 rounded bg-[var(--color-mist-200)] mb-3" />
            {[0, 1].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}