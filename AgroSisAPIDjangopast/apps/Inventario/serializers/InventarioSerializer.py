from rest_framework import serializers
from ..models.Inventario import Inventario

class InventarioSerializer(serializers.ModelSerializer):
    fk_herramienta_nombre = serializers.CharField(source="fk_herramienta.nombre", read_only=True)
    fk_insumo_nombre = serializers.CharField(source="fk_insumo.tipo", read_only=True)

    class Meta:
        model = Inventario
        fields = "__all__"
