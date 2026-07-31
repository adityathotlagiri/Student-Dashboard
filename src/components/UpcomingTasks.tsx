import { Clock } from "lucide-react";
import type { Task } from "../types/course";

const priorityStyles: Record<Task["priority"], string> = {
  high: "bg-red-50 text-red-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-gray-100 text-gray-600",
};

export default function UpcomingTasks({
  tasks,
  isLoading,
}: {
  tasks: Task[];
  isLoading: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">Upcoming tasks</h2>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-gray-500">You're all caught up.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{task.courseTitle}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                  {task.priority}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {task.dueDate}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
