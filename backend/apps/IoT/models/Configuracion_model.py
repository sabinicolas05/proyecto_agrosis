from django.db import models

class Configuracion(models.Model):
    tipo_cultivo = models.CharField(max_length=100)
    tipo_sensor = models.CharField(max_length=100)
    valor_min =  models.DecimalField(max_digits=10, decimal_places=2) 
    valor_max =  models.DecimalField(max_digits=10, decimal_places=2) 
    def __str__(self):
        return str(self.valor_min) + str(self.valor_max)