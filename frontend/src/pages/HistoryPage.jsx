// ============================================
// 📜 HISTORY PAGE - BLUEWAVE NEURAL CHAT
// Histórico de mensagens por usuário (A/B)
// ============================================
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { fetchMessages } from "../services/api";
import MessageList from "../components/MessageList";

export default function HistoryPage() {
  const { activeUser } = useUser();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      setError(null);

      try {
        // fetchMessages retorna diretamente o "data"
        const data = await fetchMessages(activeUser);
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err?.message || "Erro ao carregar histórico.");
      } finally {
        setLoading(false);
      }
    }

    if (activeUser) {
      loadHistory();
    }
  }, [activeUser]);

  return (
    <div className="page">
      <section className="history-section">
        <h2>Histórico - Usuário {activeUser}</h2>

        <p className="history-meta">
          Mostrando todas as mensagens salvas no backend para o usuário ativo.
        </p>

        {error && <p className="status-error">{error}</p>}

        {loading ? (
          <p className="status-info">Carregando...</p>
        ) : (
          <div className="chat-card">
            <MessageList messages={messages} />
          </div>
        )}
      </section>
    </div>
  );
}
