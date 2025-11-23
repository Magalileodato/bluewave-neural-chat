# ============================================
# ⚙️ APP CONFIG - BLUEWAVE NEURAL CHAT
# Configuração do aplicativo "chat"
# ============================================

from django.apps import AppConfig


class ChatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "chat"
    verbose_name = "Módulo de Chat"

    # Caso futuramente use signals.py, ele já fica preparado:
    # def ready(self):
    #     import chat.signals
