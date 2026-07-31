import { Menu, Bell, Search } from "lucide-react";
import type { StudentProfile } from "../types/course";

interface NavbarProps {
  onMenuClick: () => void;
  profile: StudentProfile | null;
}

export default function Navbar({ onMenuClick, profile }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 shrink-0">
          <Menu size={22} />
        </button>

        <div className="relative hidden sm:block flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
            {profile?.avatarInitials ?? "--"}
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {profile?.name ?? "Loading..."}
          </span>
        </div>
      </div>
    </header>
  );
}
