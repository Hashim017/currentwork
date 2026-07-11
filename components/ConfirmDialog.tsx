"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Task } from "@/types/task";

export function ConfirmDialog({
  task,
  onConfirm,
  onCancel,
}: {
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {task && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink-900)]/40 backdrop-blur-sm p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-[var(--shadow-lift)]"
          >
            <h3 className="font-display text-base font-semibold text-[var(--color-ink-900)]">
              Delete this task?
            </h3>
            <p className="mt-1.5 text-sm text-[var(--color-ink-500)]">
              &ldquo;{task.title}&rdquo; will be permanently removed. This
              can&apos;t be undone.
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-[var(--color-mist-200)] py-2.5 text-sm font-medium text-[var(--color-ink-500)] hover:bg-[var(--color-mist-100)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-[var(--color-coral-500)] py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}