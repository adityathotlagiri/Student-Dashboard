import { useEffect, useRef, useState } from "react";
import { AlertCircle, GraduationCap, Menu } from "lucide-react";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatMessageBubble from "../components/chat/ChatMessageBubble";
import ChatInput from "../components/chat/ChatInput";
import TypingLoader from "../components/chat/TypingLoader";
import { useChat } from "../hooks/useChat";

export default function AiChatPage() {
  const {
    conversations,
    activeConversation,
    activeId,
    setActiveId,
    isLoadingList,
    isSending,
    error,
    handleNewChat,
    handleDelete,
    handleSend,
  } = useChat();

  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length, isSending]);

  return (
    <div className="h-screen flex bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed sm:static inset-y-0 left-0 z-40 transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <ChatSidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={(id) => {
            setActiveId(id);
            setSidebarOpen(false);
          }}
          onNewChat={handleNewChat}
          onDelete={handleDelete}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-gray-200 bg-white">
          <button onClick={() => setSidebarOpen(true)} className="sm:hidden text-gray-600">
            <Menu size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
            <GraduationCap size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-gray-900 text-sm truncate">
              {activeConversation?.title ?? "AI Tutor"}
            </h1>
            <p className="text-xs text-gray-500">Always here to help you learn</p>
          </div>
        </header>

        {error && (
          <div className="mx-4 sm:mx-6 mt-3 flex items-center gap-2 bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-5">
          {isLoadingList ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-2xl animate-pulse w-2/3" />
              ))}
            </div>
          ) : !activeConversation ? (
            <div className="flex-1 flex items-center justify-center text-center text-gray-400 text-sm">
              Start a new chat to talk with your AI tutor.
            </div>
          ) : (
            <>
              {activeConversation.messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
              {isSending && <TypingLoader />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={!activeConversation || isSending} />
      </div>
    </div>
  );
}
