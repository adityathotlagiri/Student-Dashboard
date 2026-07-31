export default function TypingLoader() {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs font-medium text-indigo-600">AI Tutor</span>
        <div className="px-4 py-3 bg-gray-100 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
