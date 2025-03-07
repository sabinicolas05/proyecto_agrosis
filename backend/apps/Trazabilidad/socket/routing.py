from django.urls import re_path
from apps.Trazabilidad.socket.consumers import TipoEspecieConsumer

websocket_urlpatterns = [
    re_path(r"ws/tipo_especie/$", TipoEspecieConsumer.as_asgi()),
]
