# ============================================
# 🚏 VIEWS - ENDPOINTS DO CHAT
# ============================================
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from .models import ChatUser, Message
from .serializers import MessageSerializer


def get_bot_reply_for_user(user_code: str) -> str:
    """
    Retorna a resposta mockada do bot de acordo com o usuário (A ou B).
    """
    if user_code == "A":
        return "Obrigado, Usuário A! Sua mensagem foi recebida. Em breve responderemos."
    if user_code == "B":
        return "Olá, Usuário B! Obrigado pelo contato. Nossa equipe retornará em breve."

    # Fallback genérico (não deve ocorrer no fluxo normal)
    return "Obrigado por seu contato. Em breve responderemos."


class SendMessageView(APIView):
    """
    Endpoint responsável por receber uma mensagem do usuário,
    salvar a mensagem no banco e gerar uma resposta automática do bot.

    Método: POST /api/chat/send/
    Body esperado (JSON):
    {
      "user": "A" ou "B",
      "text": "mensagem do usuário"
    }
    """

    def post(self, request):
        user_code = request.data.get("user")
        text = request.data.get("text")

        # Validação simples de entrada
        if not user_code or not text:
            return Response(
                {"detail": "Os campos 'user' e 'text' são obrigatórios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Garante que o ChatUser exista (A ou B)
        chat_user, _ = ChatUser.objects.get_or_create(code=user_code)

        # Mensagem do usuário
        user_msg = Message.objects.create(
            user=chat_user,
            sender="user",
            text=text,
        )

        # Resposta mockada do bot
        bot_text = get_bot_reply_for_user(user_code)
        bot_msg = Message.objects.create(
            user=chat_user,
            sender="bot",
            text=bot_text,
        )

        # Serializa as duas mensagens na resposta
        return Response(
            {
                "user_message": MessageSerializer(user_msg).data,
                "bot_message": MessageSerializer(bot_msg).data,
            },
            status=status.HTTP_201_CREATED,
        )


class UserMessagesListView(generics.ListAPIView):
    """
    Lista o histórico de mensagens (usuário + bot)
    filtrado pelo usuário mockado (A ou B).

    Endpoint:
      GET /api/messages/?user=A
      GET /api/messages/?user=B
    """

    serializer_class = MessageSerializer

    def get_queryset(self):
        user_code = self.request.query_params.get("user")

        if not user_code:
            # Sem parâmetro ?user= → não retorna nada
            return Message.objects.none()

        try:
            chat_user = ChatUser.objects.get(code=user_code)
        except ChatUser.DoesNotExist:
            # Usuário inválido → nenhum resultado
            return Message.objects.none()

        # O ordenamento já é garantido pelo Meta de Message
        return Message.objects.filter(user=chat_user)
