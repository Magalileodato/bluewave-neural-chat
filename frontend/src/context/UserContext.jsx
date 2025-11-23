// ============================================
// 👥 USER CONTEXT - BLUEWAVE NEURAL CHAT
// Gerencia o usuário ativo (A ou B) globalmente
// ============================================

import { createContext, useContext, useState } from "react";

// Criando o contexto
const UserContext = createContext(null);

// --------------------------------------------
// 🧩 Provider do usuário ativo
// Envia activeUser + setActiveUser para toda a aplicação
// --------------------------------------------
export function UserProvider({ children }) {
  const [activeUser, setActiveUser] = useState("A");

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
}

// --------------------------------------------
// 🔄 Hook customizado para consumir o contexto
// --------------------------------------------
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de <UserProvider>");
  }

  return context;
}
