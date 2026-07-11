import { BoardSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <main className="flex-1">
      <div className="sticky top-0 z-30 bg-[var(--color-mist-100)]/80 backdrop-blur-md border-b border-[var(--color-mist-200)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 h-[60px]" />
      </div>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="h-8 w-64 rounded bg-[var(--color-mist-200)] animate-pulse mb-2" />
        <div className="h-4 w-80 rounded bg-[var(--color-mist-100)] animate-pulse mb-8" />
        <BoardSkeleton />
      </div>
    </main>
  );
}