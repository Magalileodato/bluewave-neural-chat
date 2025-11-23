#!/usr/bin/env python
# ============================================
# 🚀 DJANGO MANAGER - BLUEWAVE NEURAL CHAT
# Script principal para comandos do Django
# (runserver, migrate, shell, createsuperuser...)
# ============================================

import os
import sys


def main():
    """Ponto de entrada dos comandos de gerenciamento do Django."""

    # Define o módulo de configurações padrão
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bluewave_backend.settings")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        # Erro amigável caso Django não esteja instalado/ativado
        raise ImportError(
            (
                "Não foi possível importar o Django. "
                "Verifique se o ambiente virtual está ativado "
                "e se as dependências foram instaladas corretamente."
            )
        ) from exc

    # Executa o comando recebido via terminal
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
