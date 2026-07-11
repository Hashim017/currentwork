import { prisma } from "@/lib/prisma";
import type { CreateTaskInput, UpdateTaskInput } from "@/types/task";

export async function listTasks() {
  return prisma.task.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });
}

export async function getTask(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export async function createTask(input: CreateTaskInput) {
  return prisma.task.create({
    data: {
      title: input.title.trim(),
      description: input.description?.trim() || null,
      priority: input.priority ?? "MEDIUM",
      dueDate: input.dueDate ? new Date(input.dueDate) : null,
    },
  });
}

export async function updateTask(id: string, input: UpdateTaskInput) {
  return prisma.task.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.description !== undefined
        ? { description: input.description?.trim() || null }
        : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.priority !== undefined ? { priority: input.priority } : {}),
      ...(input.dueDate !== undefined
        ? { dueDate: input.dueDate ? new Date(input.dueDate) : null }
        : {}),
    },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}