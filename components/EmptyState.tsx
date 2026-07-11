"use client";

import { motion } from "framer-motion";
import { Waves } from "lucide-react";

export function EmptyState({ onAddTask }: { onAddTask: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--color-mist-300)] px-6 py-20 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-flow-100)] text-[var(--color-flow-500)] mb-4">
        <Waves size={22} />
      </span>
      <h3 className="font-display text-lg font-semibold text-[var(--color-ink-900)]">
        Nothing captured yet
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-[var(--color-ink-500)]">
        Add your first task and watch it move from captured to done.
      </p>
      <button
        onClick={onAddTask}
        className="mt-5 rounded-full bg-[var(--color-flow-500)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-flow-600)] transition-colors"
      >
        Add a task
      </button>
    </motion.div>
  );
}