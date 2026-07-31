import { Plus, Search, MessageSquare, Trash2, MoveLeftIcon } from "lucide-react";
import type { Conversation } from "../../types/chat";
import { useNavigate } from "react-router-dom";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  searchQuery,
  onSearchChange,
}: ChatSidebarProps) {
  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  return (
    <aside className="w-full sm:w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex flex-col gap-3">
        <button
          onClick={()=> navigate("/")}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          <MoveLeftIcon size={16} />
          Back to Dashboard
        </button>
        <button
          onClick={onNewChat}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New chat
        </button>
        

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <p className="px-2 text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
          Conversations
        </p>

        {filtered.length === 0 ? (
          <p className="px-2 text-sm text-gray-400">No conversations found.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((conv) => (
              <li key={conv.id}>
                <button
                  onClick={() => onSelect(conv.id)}
                  className={`group w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors
                  ${
                    activeId === conv.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare size={15} className="shrink-0" />
                  <span className="flex-1 min-w-0 text-sm truncate">{conv.title}</span>
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
