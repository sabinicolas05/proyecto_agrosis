# Generated by Django 5.1.3 on 2025-03-19 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='herramienta',
            name='precioCU',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
