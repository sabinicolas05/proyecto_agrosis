from ..models.Sensor_model import Sensor
from rest_framework.serializers import ModelSerializer

class SensorSerializer(ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'