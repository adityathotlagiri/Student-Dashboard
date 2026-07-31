import { useEffect, useState } from "react";
import { fetchCourses, fetchActivities, fetchTasks, fetchProfile } from "../data/courses";
import type { Course, Activity, Task, StudentProfile } from "../types/course";

interface DashboardData {
  courses: Course[];
  activities: Activity[];
  tasks: Task[];
  profile: StudentProfile | null;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardData(): DashboardData {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const [coursesData, activitiesData, tasksData, profileData] = await Promise.all([
          fetchCourses(),
          fetchActivities(),
          fetchTasks(),
          fetchProfile(),
        ]);

        if (!isMounted) return;
        setCourses(coursesData);
        setActivities(activitiesData);
        setTasks(tasksData);
        setProfile(profileData);
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { courses, activities, tasks, profile, isLoading, error };
}
