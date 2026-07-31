import { BookOpen } from "lucide-react";
import type { Course } from "../types/course";

const statusStyles: Record<Course["status"], string> = {
  completed: "bg-emerald-50 text-emerald-700",
  "in-progress": "bg-blue-50 text-blue-700",
  "not-started": "bg-gray-100 text-gray-600",
};

const statusLabels: Record<Course["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  "not-started": "Not started",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className={`w-10 h-10 rounded-lg ${course.thumbnailColor} flex items-center justify-center text-white shrink-0`}>
          <BookOpen size={18} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[course.status]}`}>
          {statusLabels[course.status]}
        </span>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 text-sm leading-snug">{course.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{course.instructor} · {course.category}</p>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${course.thumbnailColor}`}
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
