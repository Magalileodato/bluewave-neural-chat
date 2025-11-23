# ============================================
# 🌐 IMAGEM BASE (NODE + ALPINE)
# ============================================
# Usamos Node 20 em Alpine Linux para uma imagem leve e eficiente.
FROM node:20-alpine

# ============================================
# 📁 DIRETÓRIO DE TRABALHO
# ============================================
WORKDIR /app

# ============================================
# 📦 DEPENDÊNCIAS DO PROJETO
# ============================================
# Copiamos apenas arquivos de manifesto para aproveitar cache de build.
COPY package.json package-lock.json* ./

# Instalação de dependências
# O fallback "--legacy-peer-deps" evita conflitos comuns do npm.
RUN npm install || npm install --legacy-peer-deps

# ============================================
# 📦 CÓDIGO DA APLICAÇÃO
# ============================================
# Agora copiamos o restante dos arquivos do frontend.
COPY . /app

# ============================================
# 🔌 PORTA EXPOSTA
# ============================================
# O Vite usa a porta 5173 por padrão.
EXPOSE 5173

# ============================================
# 🚀 COMANDO DE INICIALIZAÇÃO
# ============================================
# Inicia o Vite Dev Server acessível via Docker:
# --host permite acesso externo
# --port força o uso da porta 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
