import { BookOpenCheck, ClipboardCheck, FileCheck2, Award } from "lucide-react";
import type { Activity } from "../types/course";

const iconMap: Record<Activity["type"], typeof BookOpenCheck> = {
  lesson: BookOpenCheck,
  quiz: ClipboardCheck,
  assignment: FileCheck2,
  achievement: Award,
};

const colorMap: Record<Activity["type"], string> = {
  lesson: "bg-blue-50 text-blue-600",
  quiz: "bg-violet-50 text-violet-600",
  assignment: "bg-amber-50 text-amber-600",
  achievement: "bg-emerald-50 text-emerald-600",
};

export default function RecentActivity({
  activities,
  isLoading,
}: {
  activities: Activity[];
  isLoading: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="font-semibold text-gray-900 mb-4">Recent activity</h2>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <li key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}>
                  <Icon size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 leading-snug">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.courseTitle} · {activity.timestamp}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
