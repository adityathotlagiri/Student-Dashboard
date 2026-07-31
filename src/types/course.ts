export type CourseStatus = "not-started" | "in-progress" | "completed";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number; // 0-100
  status: CourseStatus;
  totalLessons: number;
  completedLessons: number;
  thumbnailColor: string; // tailwind gradient/bg class
}

export interface Activity {
  id: string;
  type: "lesson" | "quiz" | "assignment" | "achievement";
  title: string;
  courseTitle: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

export interface StudentProfile {
  name: string;
  email: string;
  avatarInitials: string;
  enrolledCourses: number;
  completedCourses: number;
  overallProgress: number;
}
