import type { Course, Activity, Task, StudentProfile } from "../types/course";

const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    title: "React & TypeScript Essentials",
    instructor: "Aditya Sharma",
    category: "Frontend Development",
    progress: 100,
    status: "completed",
    totalLessons: 24,
    completedLessons: 24,
    thumbnailColor: "bg-emerald-500",
  },
  {
    id: "c2",
    title: "Advanced Tailwind CSS",
    instructor: "Priya Nair",
    category: "UI Design",
    progress: 62,
    status: "in-progress",
    totalLessons: 18,
    completedLessons: 11,
    thumbnailColor: "bg-blue-500",
  },
  {
    id: "c3",
    title: "Node.js & Express APIs",
    instructor: "Rahul Verma",
    category: "Backend Development",
    progress: 30,
    status: "in-progress",
    totalLessons: 20,
    completedLessons: 6,
    thumbnailColor: "bg-violet-500",
  },
  {
    id: "c4",
    title: "Data Structures in JavaScript",
    instructor: "Sneha Iyer",
    category: "Computer Science",
    progress: 0,
    status: "not-started",
    totalLessons: 16,
    completedLessons: 0,
    thumbnailColor: "bg-amber-500",
  },
];

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    type: "lesson",
    title: "Completed lesson: useEffect Deep Dive",
    courseTitle: "React & TypeScript Essentials",
    timestamp: "2 hours ago",
  },
  {
    id: "a2",
    type: "quiz",
    title: "Scored 92% on Flexbox & Grid Quiz",
    courseTitle: "Advanced Tailwind CSS",
    timestamp: "Yesterday",
  },
  {
    id: "a3",
    type: "assignment",
    title: "Submitted assignment: Build a REST API",
    courseTitle: "Node.js & Express APIs",
    timestamp: "2 days ago",
  },
  {
    id: "a4",
    type: "achievement",
    title: "Earned badge: Frontend Fundamentals",
    courseTitle: "React & TypeScript Essentials",
    timestamp: "4 days ago",
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: "t1",
    title: "Submit Middleware Assignment",
    courseTitle: "Node.js & Express APIs",
    dueDate: "Tomorrow",
    priority: "high",
  },
  {
    id: "t2",
    title: "Complete Responsive Layout Exercise",
    courseTitle: "Advanced Tailwind CSS",
    dueDate: "In 3 days",
    priority: "medium",
  },
  {
    id: "t3",
    title: "Start Data Structures Module 1",
    courseTitle: "Data Structures in JavaScript",
    dueDate: "In 5 days",
    priority: "low",
  },
];

const MOCK_PROFILE: StudentProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarInitials: "JD",
  enrolledCourses: MOCK_COURSES.length,
  completedCourses: MOCK_COURSES.filter((c) => c.status === "completed").length,
  overallProgress: Math.round(
    MOCK_COURSES.reduce((sum, c) => sum + c.progress, 0) / MOCK_COURSES.length
  ),
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCourses(): Promise<Course[]> {
  await delay(300);
  return MOCK_COURSES;
}

export async function fetchActivities(): Promise<Activity[]> {
  await delay(250);
  return MOCK_ACTIVITIES;
}

export async function fetchTasks(): Promise<Task[]> {
  await delay(250);
  return MOCK_TASKS;
}

export async function fetchProfile(): Promise<StudentProfile> {
  await delay(200);
  return MOCK_PROFILE;
}
