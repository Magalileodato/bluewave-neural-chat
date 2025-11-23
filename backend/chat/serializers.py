# ============================================
# 🔄 SERIALIZERS - CHAT
# ============================================
from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Serializador das mensagens enviadas e recebidas no chat.
    """

    class Meta:
        model = Message
        fields = ['id', 'user', 'sender', 'text', 'created_at']
        read_only_fields = ['id', 'created_at']
