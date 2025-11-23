# ============================================
# 🌐 URLS - CHAT API
# ============================================
from django.urls import path
from .views import SendMessageView, UserMessagesListView

urlpatterns = [
    # Envio de mensagens (usuário → bot)
    path("chat/send/", SendMessageView.as_view(), name="chat-send"),

    # Histórico filtrado por usuário (?user=A ou B)
    path("messages/", UserMessagesListView.as_view(), name="user-messages"),
]
