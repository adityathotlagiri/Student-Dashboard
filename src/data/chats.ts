// import type { Conversation, ChatMessage } from "../types/chat";


// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const GREETING = "Hello student! How can I help you today?";

// function makeGreetingConversation(id: string, title: string, updatedAt: string): Conversation {
//   return {
//     id,
//     title,
//     updatedAt,
//     messages: [
//       {
//         id: `${id}-m1`,
//         sender: "ai",
//         text: GREETING,
//         timestamp: updatedAt,
//       },
//     ],
//   };
// }

// const MOCK_CONVERSATIONS: Conversation[] = [
//   {
//     id: "conv-1",
//     title: "React lifecycle methods",
//     updatedAt: "Yesterday",
//     messages: [
//       { id: "m1", sender: "ai", text: GREETING, timestamp: "Yesterday" },
//       {
//         id: "m2",
//         sender: "user",
//         text: "Can you explain useEffect cleanup functions?",
//         timestamp: "Yesterday",
//       },
//       {
//         id: "m3",
//         sender: "ai",
//         text: "Sure! A cleanup function runs before the component unmounts, or before the effect runs again. It's how you cancel subscriptions, clear timers, or remove event listeners so they don't pile up.",
//         timestamp: "Yesterday",
//       },
//     ],
//   },
//   {
//     id: "conv-2",
//     title: "Tailwind grid layouts",
//     updatedAt: "2 days ago",
//     messages: [
//       { id: "m4", sender: "ai", text: GREETING, timestamp: "2 days ago" },
//       {
//         id: "m5",
//         sender: "user",
//         text: "What's the difference between grid-cols and auto-fit?",
//         timestamp: "2 days ago",
//       },
//     ],
//   },
// ];

// export async function fetchConversations(): Promise<Conversation[]> {
//   await delay(250);
//   return MOCK_CONVERSATIONS;
// }

// export async function createConversation(): Promise<Conversation> {
//   await delay(150);
//   const id = `conv-${Date.now()}`;
//   return makeGreetingConversation(id, "New chat", "Just now");
// }

// export async function sendMessageToAi(
//   conversationHistory: ChatMessage[],
//   message: string
// ): Promise<string> {
//   await delay(600);
//   return `This is a placeholder response. Once connected to the backend, I'll answer: "${message}"`;
// }
import axios from "axios";
import type { Conversation, ChatMessage } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GREETING = "Hello student! How can I help you today?";

function makeGreetingConversation(id: string, title: string, updatedAt: string): Conversation {
  return {
    id,
    title,
    updatedAt,
    messages: [
      {
        id: `${id}-m1`,
        sender: "ai",
        text: GREETING,
        timestamp: updatedAt,
      },
    ],
  };
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    title: "React lifecycle methods",
    updatedAt: "Yesterday",
    messages: [
      { id: "m1", sender: "ai", text: GREETING, timestamp: "Yesterday" },
      {
        id: "m2",
        sender: "user",
        text: "Can you explain useEffect cleanup functions?",
        timestamp: "Yesterday",
      },
      {
        id: "m3",
        sender: "ai",
        text: "Sure! A cleanup function runs before the component unmounts, or before the effect runs again. It's how you cancel subscriptions, clear timers, or remove event listeners so they don't pile up.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "conv-2",
    title: "Tailwind grid layouts",
    updatedAt: "2 days ago",
    messages: [
      { id: "m4", sender: "ai", text: GREETING, timestamp: "2 days ago" },
      {
        id: "m5",
        sender: "user",
        text: "What's the difference between grid-cols and auto-fit?",
        timestamp: "2 days ago",
      },
    ],
  },
];

export async function fetchConversations(): Promise<Conversation[]> {
  await delay(250);
  return MOCK_CONVERSATIONS;
}

export async function createConversation(): Promise<Conversation> {
  await delay(150);
  const id = `conv-${Date.now()}`;
  return makeGreetingConversation(id, "New chat", "Just now");
}

export async function sendMessageToAi(
  conversationHistory: ChatMessage[],
  message: string
): Promise<string> {
  const { data } = await axios.post(`${API_URL}/chat`, {
    message,
    history: conversationHistory,
  });
  return data.reply;
}