"use client";

import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink } from "lucide-react";
import { useGithubRepos } from "@/lib/useGithub";

const LANGUAGE_DOT: Record<string, string> = {
  TypeScript: "var(--color-flow-500)",
  JavaScript: "var(--color-amber-500)",
  Python: "var(--color-teal-500)",
  HTML: "var(--color-coral-500)",
};

export function GithubPanel({ username }: { username: string }) {
  const { data: repos, isLoading, isError } = useGithubRepos(username);

  return (
    <div className="rounded-2xl border border-[var(--color-mist-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2 mb-4">
        <GitFork size={16} className="text-[var(--color-ink-500)]" />
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink-700)]">
          Recent repositories
        </h2>
        <span className="font-data text-xs text-[var(--color-ink-300)]">
          @{username}
        </span>
      </div>

      {isLoading && (
        <div className="space-y-2.5 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-[var(--color-mist-100)]" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-xs text-[var(--color-coral-500)]">
          Couldn&apos;t reach GitHub right now. Try again shortly.
        </p>
      )}

      {!isLoading && !isError && repos && repos.length === 0 && (
        <p className="text-xs text-[var(--color-ink-300)]">
          No public repositories found.
        </p>
      )}

      {!isLoading && !isError && repos && repos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="group flex flex-col rounded-xl border border-[var(--color-mist-200)] p-3 hover:border-[var(--color-flow-400)] transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-[var(--color-ink-900)] truncate">
                  {repo.name}
                </span>
                <ExternalLink
                  size={12}
                  className="shrink-0 text-[var(--color-ink-300)] opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              {repo.description && (
                <p className="mt-1 text-xs text-[var(--color-ink-500)] line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-3">
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-ink-300)]">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          LANGUAGE_DOT[repo.language] ?? "var(--color-ink-300)",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[11px] text-[var(--color-ink-300)]">
                  <Star size={11} />
                  {repo.stars}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}