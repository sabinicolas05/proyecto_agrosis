import logging
import json
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.Trazabilidad.models.tipo_especie import Tipo_Especie  # Importación directa del modelo
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Tipo_Especie)
def notificar_nuevo_objeto(sender, instance, created, **kwargs):
    try:
        accion = "creado" if created else "actualizado"
        message = f"Señal recibida: Objeto {accion}: {instance}"
        logger.info(message)

        # Obtener el canal
        channel_layer = get_channel_layer()
        if not channel_layer:
            logger.warning("No se pudo obtener el canal de WebSockets.")
            return

        # Enviar mensaje al grupo
        async_to_sync(channel_layer.group_send)(
            "objects_group",
            {
                "type": "nuevo_objeto",
                "message": json.dumps({
                    "status": "success",
                    "action": accion,
                    "object": str(instance)
                })
            }
        )
    except Exception as e:
        logger.error(f"Error al enviar el mensaje WebSocket: {e}", exc_info=True)
