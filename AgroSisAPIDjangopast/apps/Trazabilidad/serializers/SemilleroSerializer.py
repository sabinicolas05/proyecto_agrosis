from rest_framework import serializers
from ..models.Semillero import Semillero

class SemilleroSerializer(serializers.ModelSerializer):
    nombre_especie = serializers.CharField(source="fk_especie.nombre", read_only=True)
    nombre_lote = serializers.CharField(source="fk_lote.nombre", read_only=True)

    class Meta:
        model = Semillero
        fields = '__all__'
