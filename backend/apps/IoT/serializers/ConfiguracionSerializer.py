from ..models.Configuracion import Configuracion
from rest_framework.serializers import ModelSerializer

class ConfiguracionSerializer(ModelSerializer):
    class Meta:
        model = Configuracion
        fields = '__all__'