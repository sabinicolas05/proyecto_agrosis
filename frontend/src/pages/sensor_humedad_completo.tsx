import React, { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import Label from '@/components/Label';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SensorForm2() {
  const [formData, setFormData] = useState({
    nombre_sensor: '',
    tipo_sensor: '',
    cultivo: '',
    unidad_medida: '',
    ubicacion: '',
    valor_min: '',
    valor_max: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando datos del sensor...');

    const token = localStorage.getItem('token'); // Obtener el token almacenado
    if (!token) {
      toast.error('No estás autenticado');
      return;
    }

    try {
      const dataToSend = {
        nombre_sensor: formData.nombre_sensor,
        tipo_sensor: formData.tipo_sensor,
        cultivo: formData.cultivo,
        unidad_medida: formData.unidad_medida,
        ubicacion: parseFloat(formData.ubicacion),
        valor_min: parseFloat(formData.valor_min),
        valor_max: parseFloat(formData.valor_max),
      };

      if (
        isNaN(dataToSend.ubicacion) ||
        isNaN(dataToSend.valor_min) ||
        isNaN(dataToSend.valor_max)
      ) {
        toast.error('Los valores deben ser números válidos');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/sensor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluir el token en los headers
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('Estado de respuesta:', response.status);
      if (response.ok) {
        toast.success('Sensor registrado con éxito');
        setFormData({
          nombre_sensor: '',
          tipo_sensor: '',
          cultivo: '',
          unidad_medida: '',
          ubicacion: '',
          valor_min: '',
          valor_max: '',
        }); // Reiniciar formulario
      } else {
        const data = await response.json();
        console.log('Error data:', data);
        toast.error(`Error en el registro: ${data.error || 'Datos inválidos'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error en el registro del sensor');
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Registrar Sensor</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <Label htmlFor="nombre_sensor">Nombre del Sensor</Label>
            <Input
              type="text"
              id="nombre_sensor"
              name="nombre_sensor"
              value={formData.nombre_sensor}
              onChange={handleChange}
              placeholder="Nombre del sensor"
            />
          </div>
          <div>
            <Label htmlFor="tipo_sensor">Tipo de Sensor</Label>
            <Input
              type="text"
              id="tipo_sensor"
              name="tipo_sensor"
              value={formData.tipo_sensor}
              onChange={handleChange}
              placeholder="Tipo de sensor"
            />
          </div>
          <div>
            <Label htmlFor="cultivo">Cultivo</Label>
            <Input
              type="text"
              id="cultivo"
              name="cultivo"
              value={formData.cultivo}
              onChange={handleChange}
              placeholder="Cultivo"
            />
          </div>
          <div>
            <Label htmlFor="unidad_medida">Unidad de Medida</Label>
            <Input
              type="text"
              id="unidad_medida"
              name="unidad_medida"
              value={formData.unidad_medida}
              onChange={handleChange}
              placeholder="Unidad de medida"
            />
          </div>
          <div>
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              type="number"
              step="0.1"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ubicación"
            />
          </div>
          <div>
            <Label htmlFor="valor_min">Valor Mínimo</Label>
            <Input
              type="number"
              step="0.1"
              id="valor_min"
              name="valor_min"
              value={formData.valor_min}
              onChange={handleChange}
              placeholder="Valor mínimo"
            />
          </div>
          <div>
            <Label htmlFor="valor_max">Valor Máximo</Label>
            <Input
              type="number"
              step="0.1"
              id="valor_max"
              name="valor_max"
              value={formData.valor_max}
              onChange={handleChange}
              placeholder="Valor máximo"
            />
          </div>
          <Button type="submit">Registrar Sensor</Button>
        </form>
      </section>
    </DefaultLayout>
  );
}
