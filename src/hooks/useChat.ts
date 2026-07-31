import { useEffect, useState } from "react";
import type { Conversation, ChatMessage } from "../types/chat";
import { fetchConversations, createConversation, sendMessageToAi } from "../data/chats";

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await fetchConversations();
        if (!isMounted) return;
        setConversations(data);
        setActiveId(data[0]?.id ?? null);
      } catch {
        if (isMounted) setError("Couldn't load your conversations.");
      } finally {
        if (isMounted) setIsLoadingList(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  async function handleNewChat() {
    try {
      const conv = await createConversation();
      setConversations((prev) => [conv, ...prev]);
      setActiveId(conv.id);
      setError(null);
    } catch {
      setError("Couldn't start a new chat. Try again.");
    }
  }

  function handleDelete(id: string) {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      setActiveId((prev) => {
        const remaining = conversations.filter((c) => c.id !== id);
        return remaining[0]?.id ?? null;
      });
    }
  }

  async function handleSend(text: string) {
    if (!activeConversation) return;

    const userMessage: ChatMessage = {
      id: `${activeConversation.id}-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              title: c.title === "New chat" ? text.slice(0, 40) : c.title,
            }
          : c
      )
    );

    setIsSending(true);
    setError(null);
    try {
      const reply = await sendMessageToAi(activeConversation.messages, text);
      const aiMessage: ChatMessage = {
        id: `${activeConversation.id}-${Date.now()}-ai`,
        sender: "ai",
        text: reply,
        timestamp: "Just now",
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id ? { ...c, messages: [...c.messages, aiMessage] } : c
        )
      );
    } catch {
      setError("The AI tutor couldn't respond. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return {
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
  };
}
