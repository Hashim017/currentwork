"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { FlowBar } from "@/components/FlowBar";
import { TaskColumn } from "@/components/TaskColumn";
import { TaskModal, type TaskFormValues } from "@/components/TaskModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EmptyState } from "@/components/EmptyState";
import { GithubPanel } from "@/components/GithubPanel";
import { BoardSkeleton } from "@/components/Skeletons";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/lib/useTasks";
import type { Status, Task } from "@/types/task";

const COLUMNS: Status[] = ["TODO", "IN_PROGRESS", "DONE"];
const NEXT_STATUS: Record<Status, Status> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "DONE",
  DONE: "TODO",
};

export default function Home() {
  const { data: tasks, isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const grouped = useMemo(() => {
    const map: Record<Status, Task[]> = { TODO: [], IN_PROGRESS: [], DONE: [] };
    (tasks ?? []).forEach((t) => map[t.status].push(t));
    return map;
  }, [tasks]);

  function openCreateModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSubmit(values: TaskFormValues) {
    const payload = {
      title: values.title,
      description: values.description || undefined,
      priority: values.priority,
      dueDate: values.dueDate || null,
    };

    if (editingTask) {
      updateTask.mutate(
        { id: editingTask.id, input: payload },
        { onSuccess: () => setModalOpen(false) }
      );
    } else {
      createTask.mutate(payload, { onSuccess: () => setModalOpen(false) });
    }
  }

  function handleToggleStatus(task: Task) {
    updateTask.mutate({
      id: task.id,
      input: { status: NEXT_STATUS[task.status] },
    });
  }

  return (
    <main className="flex-1">
      <Header onAddTask={openCreateModal} />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-ink-900)]">
            Get your tasks moving
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-500)]">
            Capture work, track progress, watch it flow to done.
          </p>
        </motion.div>

        {isLoading && (
          <div className="mt-8">
            <BoardSkeleton />
          </div>
        )}

        {isError && (
          <div className="mt-10 rounded-2xl border border-[var(--color-coral-100)] bg-[var(--color-coral-100)]/40 p-6 text-center text-sm text-[var(--color-coral-500)]">
            Couldn&apos;t load your tasks. Check your connection and refresh.
          </div>
        )}

        {!isLoading && !isError && tasks && tasks.length === 0 && (
          <div className="mt-8">
            <EmptyState onAddTask={openCreateModal} />
          </div>
        )}

        {!isLoading && !isError && tasks && tasks.length > 0 && (
          <>
            <div className="mt-6 mb-6 rounded-2xl border border-[var(--color-mist-200)] bg-white p-5 shadow-[var(--shadow-soft)]">
              <FlowBar tasks={tasks} />
            </div>

            <div className="mb-8">
              <GithubPanel username="Hashim017" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {COLUMNS.map((status) => (
                <TaskColumn
                  key={status}
                  status={status}
                  tasks={grouped[status]}
                  onToggleStatus={handleToggleStatus}
                  onEdit={openEditModal}
                  onDelete={setTaskToDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={createTask.isPending || updateTask.isPending}
        editingTask={editingTask}
      />

      <ConfirmDialog
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask.mutate(taskToDelete.id);
            setTaskToDelete(null);
          }
        }}
      />
    </main>
  );
}