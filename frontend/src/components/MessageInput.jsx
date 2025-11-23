// ============================================
// ⌨️ MESSAGE INPUT - BLUEWAVE NEURAL CHAT
// Campo de digitação + botão "Enviar"
// com melhorias de UI/UX, acessibilidade e ganchos para animação
// ============================================

import { useState } from "react";

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const maxLength = 500;
  const trimmedText = text.trim();
  const isEmpty = !trimmedText;
  const isButtonDisabled = disabled || isEmpty;
  const remainingChars = maxLength - text.length;

  function handleSubmit(e) {
    e.preventDefault();

    const clean = text.trim();
    if (!clean) return;

    onSend(clean);
    setText("");
  }

  return (
    <form
      className="input-form"
      onSubmit={handleSubmit}
      aria-label="Formulário de envio de mensagem do chat"
    >
      <div
        className="input-wrapper"
        data-focused={isFocused ? "true" : "false"}
        data-disabled={disabled ? "true" : "false"}
      >
        <input
          id="message-input"
          name="message"
          type="text"
          placeholder="Digite sua mensagem..."
          aria-label="Campo para digitar mensagem do chat"
          aria-disabled={disabled}
          aria-invalid={false}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isButtonDisabled}
          aria-label="Enviar mensagem"
          aria-disabled={isButtonDisabled}
          className="send-button"
          data-can-send={isButtonDisabled ? "false" : "true"}
        >
          Enviar
        </button>
      </div>

      <div className="input-meta">
        <span
          className="char-counter"
          aria-live="polite"
          aria-atomic="true"
        >
          {remainingChars} caracteres restantes
        </span>
      </div>
    </form>
  );
}
