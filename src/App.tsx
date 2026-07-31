import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AiChatPage from "./pages/AiChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/chat" element={<AiChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
