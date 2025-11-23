// ============================================
// 🧭 APP ROUTER - BLUEWAVE NEURAL CHAT
// Rotas principais + Navbar + Seletor de Usuário
// ============================================

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import HistoryPage from "../pages/HistoryPage";
import UserSelector from "../components/UserSelector";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">
          <span className="icon">⚡</span>
          <span>BlueWave Neural Chat</span>
        </div>

        <nav className="menu">
          <Link to="/">Chat</Link>
          <Link to="/historico">Histórico</Link>
        </nav>

        <div className="user-switch">
          <UserSelector />
        </div>
      </header>

      <main className="main-container">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/historico" element={<HistoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
