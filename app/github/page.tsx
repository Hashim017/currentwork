import { GithubPanel } from "@/components/GithubPanel";
import { Header } from "@/components/Header";

export const metadata = {
  title: "GitHub Search — Currentwork",
};

export default function GithubPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink-900)]">
              GitHub search
            </h1>
            <p className="mt-1 text-sm text-[var(--color-ink-500)]">
              Look up any GitHub user&apos;s recent public repositories.
            </p>
          </div>

          <GithubPanel />
        </div>
      </main>
    </>
  );
}