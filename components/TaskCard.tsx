"use client";

import { motion } from "framer-motion";
import { Check, PencilLine, Trash2 } from "lucide-react";
import clsx from "clsx";
import type { Priority, Status, Task } from "@/types/task";
import { STATUS_LABELS } from "@/types/task";

const PRIORITY_DOT: Record<Priority, string> = {
  LOW: "var(--color-ink-300)",
  MEDIUM: "var(--color-amber-500)",
  HIGH: "var(--color-coral-500)",
};

const STATUS_OPTIONS: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

function formatDueDate(iso: string | null) {
  if (!iso) return null;
  const date = new Date(iso);
  const today = new Date();
  const diffDays = Math.round(
    (date.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) / 86400000,
  );
  if (diffDays === 0) return { text: "Today", overdue: false };
  if (diffDays === 1) return { text: "Tomorrow", overdue: false };
  if (diffDays < 0)
    return { text: `${Math.abs(diffDays)}d overdue`, overdue: true };
  return {
    text: new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    overdue: false,
  };
}

export function TaskCard({
  task,
  onToggleStatus,
  onChangeStatus,
  onEdit,
  onDelete,
}: {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onChangeStatus: (task: Task, status: Status) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  const due = formatDueDate(task.dueDate);
  const isDone = task.status === "DONE";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={clsx(
        "group relative rounded-2xl border bg-white p-4 shadow-[var(--shadow-soft)] transition-colors",
        isDone
          ? "border-[var(--color-teal-100)]"
          : "border-[var(--color-mist-200)] hover:border-[var(--color-flow-400)]",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={clsx(
              "text-sm font-medium leading-snug break-words",
              isDone
                ? "text-[var(--color-ink-300)] line-through"
                : "text-[var(--color-ink-900)]",
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-xs text-[var(--color-ink-500)] leading-relaxed break-words">
              {task.description}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: PRIORITY_DOT[task.priority] }}
              />
              <span className="font-data text-[11px] uppercase tracking-wide text-[var(--color-ink-500)]">
                {task.priority}
              </span>
            </span>

            {due && (
              <span
                className={clsx(
                  "font-data text-[11px]",
                  due.overdue
                    ? "text-[var(--color-coral-500)]"
                    : "text-[var(--color-ink-300)]",
                )}
              >
                {due.text}
              </span>
            )}
          </div>

          <div className="mt-2.5 inline-flex rounded-full bg-[var(--color-mist-100)] p-0.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onChangeStatus(task, s)}
                className={clsx(
                  "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all",
                  task.status === s
                    ? "bg-white text-[var(--color-ink-900)] shadow-sm"
                    : "text-[var(--color-ink-300)] hover:text-[var(--color-ink-500)]",
                )}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 touch-always-visible">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-ink-300)] hover:bg-[var(--color-mist-100)] hover:text-[var(--color-flow-500)] transition-colors"
          >
            <PencilLine size={14} />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label="Delete task"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--color-ink-300)] hover:bg-[var(--color-coral-100)] hover:text-[var(--color-coral-500)] transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
