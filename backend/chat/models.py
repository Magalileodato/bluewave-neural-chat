# ============================================
# 💾 MODELOS DE DADOS - CHAT
# ============================================
from django.db import models


class ChatUser(models.Model):
    """
    Usuário mockado do sistema de chat.
    No desafio temos apenas dois: A e B.
    """

    USER_CHOICES = (
        ("A", "Usuário A"),
        ("B", "Usuário B"),
    )

    code = models.CharField(
        max_length=1,
        choices=USER_CHOICES,
        unique=True,
    )

    def __str__(self):
        # Exibe "Usuário A" ou "Usuário B"
        return self.get_code_display()


class Message(models.Model):
    """
    Mensagens trocadas no chat (usuário ou bot).
    """

    SENDER_CHOICES = (
        ("user", "Usuário"),
        ("bot", "Bot"),
    )

    user = models.ForeignKey(
        ChatUser,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    sender = models.CharField(
        max_length=10,
        choices=SENDER_CHOICES,
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        # Ex.: "[A - user] Olá, gostaria de..."
        return f"[{self.user.code} - {self.sender}] {self.text[:30]}"
