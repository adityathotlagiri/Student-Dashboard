import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, MessageSquare, CheckSquare, Settings, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "My Courses", icon: BookOpen, path: "/" },
  { label: "AI Assistant", icon: MessageSquare, path: "/chat" },
  { label: "Tasks", icon: CheckSquare, path: "/" },
  { label: "Settings", icon: Settings, path: "/" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
              S
            </div>
            <span className="font-semibold text-gray-800 text-lg">StudentHub</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path && label !== "My Courses" && label !== "Tasks" && label !== "Settings";
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
