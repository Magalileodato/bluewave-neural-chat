// ============================================
// 📜 MESSAGE LIST - BLUEWAVE NEURAL CHAT
// Lista de mensagens do usuário e do bot
// ============================================

export default function MessageList({ messages }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="chat-window">
        <p className="empty-state">
          Nenhuma mensagem ainda. Envie uma mensagem para iniciar a conversa.
        </p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        const isUser = msg.sender === "user";

        // Formatação simples de horário (opcional)
        const time =
          msg.created_at
            ? new Date(msg.created_at).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : null;

        return (
          <div
            key={msg.id ?? `msg-${index}`}
            className={isUser ? "message message-user" : "message message-bot"}
          >
            <strong>{isUser ? "Você: " : "🤖 Bot: "}</strong>
            <span>{msg.text}</span>

            {time && (
              <span className="message-time">
                {time}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
