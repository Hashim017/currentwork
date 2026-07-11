"use client";

import { motion } from "framer-motion";
import { Plus, Waves } from "lucide-react";

export function Header({ onAddTask }: { onAddTask: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-mist-100)]/80 backdrop-blur-md border-b border-[var(--color-mist-200)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-flow-500)] text-white shrink-0">
            <Waves size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--color-ink-900)]">
            Currentwork
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddTask}
          className="flex items-center gap-1.5 rounded-full bg-[var(--color-flow-500)] text-white text-sm font-medium pl-3.5 pr-4 py-2 shadow-[var(--shadow-soft)] hover:bg-[var(--color-flow-600)] transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          New task
        </motion.button>
      </div>
    </header>
  );
}