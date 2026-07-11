"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Status, Task } from "@/types/task";
import { STATUS_LABELS } from "@/types/task";
import { TaskCard } from "./TaskCard";

const DOT_COLOR: Record<Status, string> = {
  TODO: "var(--color-ink-300)",
  IN_PROGRESS: "var(--color-amber-500)",
  DONE: "var(--color-teal-500)",
};

export function TaskColumn({
  status,
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
}: {
  status: Status;
  tasks: Task[];
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: DOT_COLOR[status] }}
        />
        <h2 className="font-display text-sm font-semibold text-[var(--color-ink-700)]">
          {STATUS_LABELS[status]}
        </h2>
        <span className="font-data text-xs text-[var(--color-ink-300)]">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center rounded-2xl border border-dashed border-[var(--color-mist-300)] py-8 text-xs text-[var(--color-ink-300)]"
          >
            Nothing here yet
          </motion.div>
        )}
      </div>
    </div>
  );
}