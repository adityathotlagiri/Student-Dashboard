import CourseCard from "./CourseCard";
import type { Course, CourseStatus } from "../types/course";

interface CoursesSectionProps {
  courses: Course[];
  isLoading: boolean;
}

const groups: { status: CourseStatus; heading: string }[] = [
  { status: "in-progress", heading: "In progress" },
  { status: "not-started", heading: "Not started" },
  { status: "completed", heading: "Completed" },
];

function CourseCardSkeleton() {
  return <div className="h-40 rounded-xl bg-gray-100 animate-pulse" />;
}

export default function CoursesSection({ courses, isLoading }: CoursesSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">My courses</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map(({ status, heading }) => {
            const filtered = courses.filter((c) => c.status === status);
            if (filtered.length === 0) return null;

            return (
              <div key={status}>
                <h3 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-3">
                  {heading} ({filtered.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
