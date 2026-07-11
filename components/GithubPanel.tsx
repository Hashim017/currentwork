"use client";

import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, Search } from "lucide-react";
import { useState } from "react";
import { useGithubRepos } from "@/lib/useGithub";

const LANGUAGE_DOT: Record<string, string> = {
  TypeScript: "var(--color-flow-500)",
  JavaScript: "var(--color-amber-500)",
  Python: "var(--color-teal-500)",
  HTML: "var(--color-coral-500)",
};

const DEFAULT_USERNAME = "Hashim017";

export function GithubPanel() {
  const [inputValue, setInputValue] = useState(DEFAULT_USERNAME);
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const { data: repos, isLoading, isError } = useGithubRepos(username);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) setUsername(trimmed);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-mist-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-2 mb-4 min-w-0">
        <GitFork size={16} className="text-[var(--color-ink-500)] shrink-0" />
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink-700)] shrink-0">
          Recent repositories
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="GitHub username"
          className="flex-1 min-w-0 rounded-lg border border-[var(--color-mist-200)] bg-[var(--color-mist-50)] px-3 py-1.5 text-xs text-[var(--color-ink-900)] outline-none focus:border-[var(--color-flow-500)]"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex items-center justify-center rounded-lg bg-[var(--color-flow-500)] px-3 text-white hover:bg-[var(--color-flow-600)] transition-colors shrink-0"
        >
          <Search size={14} />
        </button>
      </form>

      {isLoading && (
        <div className="space-y-2.5 animate-pulse">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-[var(--color-mist-100)]" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-xs text-[var(--color-coral-500)]">
          Couldn&apos;t find that user or reach GitHub right now.
        </p>
      )}

      {!isLoading && !isError && repos && repos.length === 0 && (
        <p className="text-xs text-[var(--color-ink-300)]">
          No public repositories found for @{username}.
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