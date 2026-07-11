"use client";

import { motion } from "framer-motion";
import type { Task } from "@/types/task";

const SEGMENTS = [
  { key: "TODO" as const, label: "Captured", color: "var(--color-ink-300)" },
  { key: "IN_PROGRESS" as const, label: "In progress", color: "var(--color-amber-500)" },
  { key: "DONE" as const, label: "Done", color: "var(--color-teal-500)" },
];

export function FlowBar({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const counts = SEGMENTS.map((s) => tasks.filter((t) => t.status === s.key).length);
  const pct = counts.map((c) => (total ? (c / total) * 100 : 0));

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-display text-sm font-medium text-[var(--color-ink-700)]">
          Flow
        </span>
        <span className="font-data text-xs text-[var(--color-ink-300)]">
          {total} total
        </span>
      </div>

      <div className="h-3 w-full rounded-full bg-[var(--color-mist-200)] overflow-hidden flex">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.key}
            initial={{ width: 0 }}
            animate={{ width: `${pct[i]}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ backgroundColor: seg.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
        {SEGMENTS.map((seg, i) => (
          <div key={seg.key} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-xs text-[var(--color-ink-500)]">
              {seg.label}
            </span>
            <span className="font-data text-xs text-[var(--color-ink-900)] font-medium">
              {counts[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}