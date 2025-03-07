import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SensorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("sensor_updates", self.channel_name)
        await self.accept()
        print("🔵 WebSocket conectado y unido al grupo 'sensor_updates'")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("sensor_updates", self.channel_name)
        print("🔴 WebSocket desconectado")

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))
        print(f"📩 Mensaje enviado al WebSocket: {message}")
