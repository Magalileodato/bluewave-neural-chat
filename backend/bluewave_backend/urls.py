# ============================================
# 🌐 BLUEWAVE NEURAL CHAT - URLS PRINCIPAIS
# ============================================

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Painel administrativo do Django
    path('admin/', admin.site.urls),

    # Endpoints da API do chatbot
    path('api/', include('chat.urls')),
]
