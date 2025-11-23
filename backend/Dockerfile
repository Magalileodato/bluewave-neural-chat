# ============================================
# 🐍 IMAGEM BASE
# ============================================
# Imagem oficial do Python 3.11, versão slim (mais leve)
FROM python:3.11-slim

# ============================================
# 📁 DIRETÓRIO DE TRABALHO
# ============================================
WORKDIR /app

# ============================================
# ⚙️ CONFIGURAÇÕES DE AMBIENTE
# ============================================
# Não gerar arquivos .pyc
ENV PYTHONDONTWRITEBYTECODE=1
# Saída sem buffer (logs em tempo real)
ENV PYTHONUNBUFFERED=1

# ============================================
# 📦 DEPENDÊNCIAS DO PROJETO
# ============================================
# Copia apenas o requirements para cache eficiente
COPY requirements.txt /app/

# Instala as dependências do backend
RUN pip install --no-cache-dir -r requirements.txt

# ============================================
# 📦 CÓDIGO DA APLICAÇÃO
# ============================================
# Copia todo o conteúdo do backend para dentro do container
COPY . /app

# ============================================
# 🔌 PORTA EXPOSTA
# ============================================
EXPOSE 8000

# ============================================
# 🚀 COMANDO DE INICIALIZAÇÃO
# ============================================
# Aplica migrações e inicia o servidor de desenvolvimento do Django
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
