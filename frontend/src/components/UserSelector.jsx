// ============================================
// 👤 USER SELECTOR - BLUEWAVE NEURAL CHAT
// Alterna entre Usuário A e Usuário B
// ============================================

import { useUser } from "../context/UserContext";

export default function UserSelector() {
  const { activeUser, setActiveUser } = useUser();

  function handleChange(e) {
    const value = e.target.value;

    // Garantir que só A ou B sejam aceitos
    if (value === "A" || value === "B") {
      setActiveUser(value);
    }
  }

  return (
    <div className="user-select">
      <label htmlFor="user-select-dropdown">
        Usuário ativo:
      </label>

      <select
        id="user-select-dropdown"       // ✅ ID único
        name="activeUser"               // ✅ name adicionado (autofill / forms)
        aria-label="Selecionar usuário ativo"  // ✅ acessibilidade
        value={activeUser}
        onChange={handleChange}
      >
        <option value="A">Usuário A</option>
        <option value="B">Usuário B</option>
      </select>
    </div>
  );
}
