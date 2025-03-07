"""
ASGI config for APIRest project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from apps.Trazabilidad.socket.routing import websocket_urlpatterns

# Asegúrate de que el nombre de tu configuración de settings esté correcto.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "APIRest.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # Manejo de solicitudes HTTP
        "websocket": AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),  # Manejo de WebSockets
    }
)
