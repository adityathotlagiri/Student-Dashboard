import type { ChatMessage } from "../../types/chat";

export default function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isAi = message.sender === "ai";

  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[70%] ${isAi ? "items-start" : "items-end"}`}>
        {isAi && (
          <span className="text-xs font-medium text-indigo-600">AI Tutor</span>
        )}
        <div
          className={`px-4 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap
          ${
            isAi
              ? "bg-gray-100 text-gray-800 rounded-tl-sm"
              : "bg-indigo-600 text-white rounded-tr-sm"
          }`}
        >
          {message.text}
        </div>
        <span className="text-xs text-gray-400">{message.timestamp}</span>
      </div>
    </div>
  );
}
