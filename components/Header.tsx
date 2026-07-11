"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Waves, GitFork, ArrowLeft } from "lucide-react";

export function Header({ onAddTask }: { onAddTask?: () => void }) {
  const pathname = usePathname();
  const onGithubPage = pathname === "/github";

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-mist-100)]/80 backdrop-blur-md border-b border-[var(--color-mist-200)]">
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-2.5 sm:py-4 flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink-0">
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[var(--color-flow-500)] text-white shrink-0"
          >
            <Waves size={14} strokeWidth={2.5} className="sm:hidden" />
            <Waves size={16} strokeWidth={2.5} className="hidden sm:block" />
          </motion.span>
          <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-[var(--color-ink-900)] truncate">
            Currentwork
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onGithubPage ? (
            <Link
              href="/"
              aria-label="Back to tasks"
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--color-mist-300)] text-[var(--color-ink-700)] text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-[var(--color-mist-100)] transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft size={14} className="shrink-0" />
              <span>Tasks</span>
            </Link>
          ) : (
            <Link
              href="/github"
              aria-label="GitHub search"
              className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--color-mist-300)] text-[var(--color-ink-700)] text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 hover:bg-[var(--color-mist-100)] transition-colors cursor-pointer whitespace-nowrap"
            >
              <GitFork size={14} className="shrink-0" />
              <span>GitHub</span>
            </Link>
          )}

          {!onGithubPage && (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onAddTask}
              aria-label="New task"
              className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-[var(--color-flow-500)] text-white text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-[var(--shadow-soft)] hover:bg-[var(--color-flow-600)] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Plus size={14} strokeWidth={2.5} className="shrink-0" />
              <span>New task</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}