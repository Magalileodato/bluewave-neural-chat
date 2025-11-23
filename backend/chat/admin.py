# ============================================
# 🔐 DJANGO ADMIN - BLUEWAVE NEURAL CHAT
# Configuração do painel administrativo
# ============================================

from django.contrib import admin
from .models import ChatUser, Message


# --------------------------------------------
# 👤 ChatUser Admin
# --------------------------------------------
@admin.register(ChatUser)
class ChatUserAdmin(admin.ModelAdmin):
    list_display = ("id", "code")
    search_fields = ("code",)
    ordering = ("code",)


# --------------------------------------------
# 💬 Message Admin
# --------------------------------------------
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "sender", "short_text", "created_at")
    list_filter = ("user", "sender", "created_at")
    search_fields = ("text",)
    ordering = ("created_at",)

    # Exibir preview curto (melhor no admin)
    def short_text(self, obj):
        return obj.text[:50] + ("..." if len(obj.text) > 50 else "")
    
    short_text.short_description = "Mensagem"
