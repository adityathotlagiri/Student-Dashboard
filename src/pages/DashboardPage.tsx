import { AlertCircle } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfileCard from "../components/ProfileCard";
import CoursesSection from "../components/CoursesSection";
import RecentActivity from "../components/RecentActivity";
import UpcomingTasks from "../components/UpcomingTasks";
import { useDashboardData } from "../hooks/useDashboardData";

export default function DashboardPage() {
  const { courses, activities, tasks, profile, isLoading, error } = useDashboardData();

  return (
    <DashboardLayout profile={profile}>
      {error && (
        <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <ProfileCard profile={profile} isLoading={isLoading} />
          <CoursesSection courses={courses} isLoading={isLoading} />
        </div>

        <div className="flex flex-col gap-6">
          <RecentActivity activities={activities} isLoading={isLoading} />
          <UpcomingTasks tasks={tasks} isLoading={isLoading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
