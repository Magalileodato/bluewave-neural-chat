// ============================================
// 🚀 ENTRY POINT - BLUEWAVE NEURAL CHAT
// Inicialização do React + UserProvider + Router
// ============================================

import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./routes/Router";
import { UserProvider } from "./context/UserContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </React.StrictMode>
);
