export type MessageSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}
