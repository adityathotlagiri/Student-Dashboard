import { Mail, BookOpen, CheckCircle2, TrendingUp } from "lucide-react";
import type { StudentProfile } from "../types/course";

interface ProfileCardProps {
  profile: StudentProfile | null;
  isLoading: boolean;
}

export default function ProfileCard({ profile, isLoading }: ProfileCardProps) {
  if (isLoading || !profile) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
        <div className="h-16 w-16 bg-gray-200 rounded-full mb-4" />
        <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-40 bg-gray-200 rounded" />
      </div>
    );
  }

  const stats = [
    { label: "Enrolled", value: profile.enrolledCourses, icon: BookOpen },
    { label: "Completed", value: profile.completedCourses, icon: CheckCircle2 },
    { label: "Progress", value: `${profile.overallProgress}%`, icon: TrendingUp },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-semibold shrink-0">
          {profile.avatarInitials}
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-900 text-lg truncate">{profile.name}</h2>
          <p className="flex items-center gap-1.5 text-sm text-gray-500 truncate">
            <Mail size={14} className="shrink-0" />
            {profile.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="text-center">
            <Icon size={16} className="mx-auto mb-1 text-indigo-600" />
            <p className="font-semibold text-gray-900 text-sm">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
