# ============================================
# 📁 PATHS E BASE DO PROJETO
# ============================================
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# ============================================
# 🔐 SEGURANÇA / DEBUG
# ============================================
# ⚠ Em produção, use variável de ambiente para SECRET_KEY e DEBUG!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-change-me')
DEBUG = os.getenv('DJANGO_DEBUG', '1') == '1'

# Para o desafio/tipo MVP, '*' é aceitável. Em produção, restringir.
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

# ============================================
# 📦 APLICATIVOS INSTALADOS
# ============================================
INSTALLED_APPS = [
    # Apps nativos do Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceiros
    'rest_framework',
    'corsheaders',

    # Apps do projeto
    'chat',
]

# ============================================
# 🧱 MIDDLEWARE
# ============================================
MIDDLEWARE = [
    # CORS deve vir antes de CommonMiddleware
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ============================================
# 🌐 URLS / WSGI / ASGI
# ============================================
ROOT_URLCONF = 'bluewave_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Diretórios extras de templates (se precisar)
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bluewave_backend.wsgi.application'
ASGI_APPLICATION = 'bluewave_backend.asgi.application'

# ============================================
# 🗄️ BANCO DE DADOS (SQLite)
# ============================================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ============================================
# 🔑 AUTENTICAÇÃO / VALIDADORES
# ============================================
AUTH_PASSWORD_VALIDATORS = []  # Para o desafio, sem validação de senha

# ============================================
# 🌍 LOCALIZAÇÃO / LINGUAGEM
# ============================================
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# ============================================
# 🎨 ARQUIVOS ESTÁTICOS
# ============================================
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================
# 🌐 CORS (PERMITIR FRONTEND ACESSAR A API)
# ============================================
CORS_ALLOW_ALL_ORIGINS = True  # Para dev / desafio técnico

# Exemplo de configuração mais restrita (se quiser depois):
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",
# ]

# ============================================
# 🤖 DJANGO REST FRAMEWORK
# ============================================
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    # Se quiser habilitar navegador DRF depois:
    # 'DEFAULT_RENDERER_CLASSES': [
    #     'rest_framework.renderers.JSONRenderer',
    #     'rest_framework.renderers.BrowsableAPIRenderer',
    # ]
}
