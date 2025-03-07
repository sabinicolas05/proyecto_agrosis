import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack  # Esto permite autenticar usuarios en WebSockets
from apps.IoT.socket.routing import websocket_urlpatterns  # Asegúrate de que el import es correcto

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "APIRest.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        ),
    }
)
