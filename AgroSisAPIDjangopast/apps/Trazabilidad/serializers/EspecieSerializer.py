from rest_framework.serializers import ModelSerializer, serializers
from ..models.Especie import Especie

class EspecieSerializer(ModelSerializer):
    fk_tipo_especie_nombre = serializers.CharField(source="fk_tipo_especie.tipo", read_only=True)
    
    class Meta:
        model = Especie
        fields = '__all__'
