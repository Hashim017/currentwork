"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import type { Priority, Task } from "@/types/task";

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

const PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH"];

function TaskForm({
  onClose,
  onSubmit,
  isSubmitting,
  editingTask,
}: {
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  isSubmitting: boolean;
  editingTask: Task | null;
}) {
  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [description, setDescription] = useState(editingTask?.description ?? "");
  const [priority, setPriority] = useState<Priority>(editingTask?.priority ?? "MEDIUM");
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate ? editingTask.dueDate.slice(0, 10) : ""
  );
  const [titleError, setTitleError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    onSubmit({ title, description, priority, dueDate });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink-900)]">
          {editingTask ? "Edit task" : "Capture a task"}
        </h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-300)] hover:bg-[var(--color-mist-100)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-xs font-medium text-[var(--color-ink-500)] mb-1.5"
          >
            Title
          </label>
          <input
            id="title"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setTitleError(false);
            }}
            placeholder="What needs doing?"
            className={clsx(
              "w-full rounded-xl border bg-[var(--color-mist-50)] px-3.5 py-2.5 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-300)] outline-none transition-colors focus:bg-white focus:border-[var(--color-flow-500)]",
              titleError
                ? "border-[var(--color-coral-500)]"
                : "border-[var(--color-mist-200)]"
            )}
          />
          {titleError && (
            <p className="mt-1 text-xs text-[var(--color-coral-500)]">
              A title is required.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-xs font-medium text-[var(--color-ink-500)] mb-1.5"
          >
            Description{" "}
            <span className="text-[var(--color-ink-300)]">(optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Any extra detail..."
            className="w-full resize-none rounded-xl border border-[var(--color-mist-200)] bg-[var(--color-mist-50)] px-3.5 py-2.5 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-300)] outline-none transition-colors focus:bg-white focus:border-[var(--color-flow-500)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-ink-500)] mb-1.5">
              Priority
            </label>
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={clsx(
                    "flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-colors",
                    priority === p
                      ? "bg-[var(--color-flow-500)] text-white"
                      : "bg-[var(--color-mist-100)] text-[var(--color-ink-500)] hover:bg-[var(--color-mist-200)]"
                  )}
                >
                  {p.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-xs font-medium text-[var(--color-ink-500)] mb-1.5"
            >
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-mist-200)] bg-[var(--color-mist-50)] px-3 py-2 text-sm text-[var(--color-ink-900)] outline-none transition-colors focus:bg-white focus:border-[var(--color-flow-500)]"
            />
          </div>
        </div>

        <div className="mt-2 flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-[var(--color-mist-200)] py-2.5 text-sm font-medium text-[var(--color-ink-500)] hover:bg-[var(--color-mist-100)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xl bg-[var(--color-flow-500)] py-2.5 text-sm font-medium text-white hover:bg-[var(--color-flow-600)] disabled:opacity-60 transition-colors"
          >
            {isSubmitting
              ? "Saving..."
              : editingTask
              ? "Save changes"
              : "Add task"}
          </button>
        </div>
      </form>
    </>
  );
}

export function TaskModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  editingTask,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  isSubmitting: boolean;
  editingTask: Task | null;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[var(--color-ink-900)]/40 backdrop-blur-sm p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl bg-white p-6 shadow-[var(--shadow-lift)]"
          >
            <TaskForm
              key={editingTask?.id ?? "new"}
              onClose={onClose}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              editingTask={editingTask}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}