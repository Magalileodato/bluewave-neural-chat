// ============================================
// 🌐 API SERVICE - BLUEWAVE NEURAL CHAT
// Comunicação frontend → backend (Django REST)
// ============================================

import axios from "axios";

// --------------------------------------------
// ⚙️ Configuração base do Axios
// - Usa env (VITE_API_BASE_URL) se existir,
//   senão mantém o localhost como padrão.
// --------------------------------------------
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10s para evitar travar requisição infinita
  // Considera como "válido" qualquer status < 500
  // (4xx continuam sendo erro de negócio, mas não viram erro de rede)
  validateStatus: (status) => status >= 200 && status < 500,
});

// --------------------------------------------
// 🛡️ Interceptores de resposta
// - Log centralizado de erros
// - Ponto único para futuras melhorias (ex: refresh token)
// --------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log básico para debug (pode ser trocado por toast futuramente)
    console.error(
      "[API ERROR]",
      error?.response?.status,
      error?.response?.data || error.message
    );

    // Mantém a rejeição para ser tratada nos serviços ou na tela
    return Promise.reject(error);
  }
);

// --------------------------------------------
// 📤 Enviar mensagem para o backend
// POST /chat/send/
// Body: { user: "A", text: "mensagem" }
// Retorno (data):
// {
//   user_message: {...},
//   bot_message: {...}
// }
// --------------------------------------------
export async function sendMessage(user, text) {
  try {
    const response = await api.post("/chat/send/", { user, text });
    return response.data;
  } catch (error) {
    const backendMessage =
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      null;

    // Wrap em mensagem amigável, usando a do backend se existir
    throw new Error(
      backendMessage ||
        "Falha ao enviar mensagem. Tente novamente em instantes."
    );
  }
}

// --------------------------------------------
// 📥 Buscar histórico do usuário
// GET /messages/?user=A
// Retorno (data): [ ...lista de mensagens... ]
// --------------------------------------------
export async function fetchMessages(user) {
  try {
    const response = await api.get("/messages/", {
      params: { user },
    });

    const data = response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    const backendMessage =
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      null;

    throw new Error(
      backendMessage ||
        "Falha ao carregar o histórico de mensagens."
    );
  }
}

export default api;
