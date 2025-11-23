// ============================================
// 💬 CHAT PAGE - BLUEWAVE NEURAL CHAT
// Página principal de conversas (Usuário A/B)
// ============================================
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { sendMessage } from "../services/api";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function ChatPage() {
  const { activeUser } = useUser();

  // Mantém as mensagens separadas por usuário (A e B)
  // Ex.: { A: [...mensagens...], B: [...mensagens...] }
  const [messagesByUser, setMessagesByUser] = useState({
    A: [],
    B: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // status "bot está digitando"

  // Mensagens exibidas na tela são sempre as do usuário ativo
  const messages = messagesByUser[activeUser] || [];

  async function handleSend(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    // Evita múltiplos envios enquanto uma requisição está em andamento
    if (loading) return;

    setLoading(true);
    setError(null);
    setIsTyping(true);

    try {
      // sendMessage retorna diretamente o "data"
      const data = await sendMessage(activeUser, cleanText);

      // Atualiza apenas o histórico do usuário ativo (A ou B)
      setMessagesByUser((prev) => {
        const prevMessages = prev[activeUser] || [];
        return {
          ...prev,
          [activeUser]: [...prevMessages, data.user_message, data.bot_message],
        };
      });
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "Erro ao enviar mensagem. Tente novamente."
      );
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-text">
          <div className="hero-badge">
            <span className="icon">🧪</span>
            <span>Chatbot de Atendimento Simulado</span>
          </div>
          <h1>
            Teste seu <span>fluxo de atendimento</span> com usuários A e B.
          </h1>
          <p>
            Esta interface simula um sistema de suporte inteligente. Selecione o
            usuário ativo na barra superior, envie mensagens e veja as respostas
            mockadas do backend em tempo real.
          </p>
        </div>

        <div className="hero-side">
          <p className="status-info">
            💡 Dica: alterne entre Usuário A e Usuário B para gerar históricos
            de conversa diferentes.
          </p>
        </div>
      </section>

      <section className="chat-section">
        <h2>Chat - Usuário {activeUser}</h2>

        {error && <p className="status-error">{error}</p>}

        {isTyping && (
          <p className="status-loading">🤖 Bot está digitando...</p>
        )}

        <div className="chat-card">
          <MessageList messages={messages} />
          <MessageInput onSend={handleSend} disabled={loading} />
        </div>
      </section>
    </div>
  );
}
