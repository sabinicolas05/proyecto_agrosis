import { useFetchSensorById } from "@/hooks/useFetchSensorById";
import { useUpdateSensor } from "@/hooks/useUpdateSensor";
import { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";

const EditarSensorModal = ({ id, onClose }) => {
  useAuth();
  const { data: sensor, isLoading } = useFetchSensorById(id);
  const { mutate: updateSensor, isLoading: isUpdating } = useUpdateSensor();

  const [formData, setFormData] = useState({
    fk_bancal: "",
    fk_tipo_sensor: "",
    fk_configuracion: "",
    fk_cultivo: "",
    medicion: "",
  });

  useEffect(() => {
    if (sensor && !isLoading) {
      console.log("📝 Datos cargados en el formulario:", sensor);
      setFormData((prev) => ({
        ...prev,
        fk_bancal: sensor.fk_bancal ?? "",
        fk_tipo_sensor: sensor.fk_tipo_sensor ?? "",
        fk_configuracion: sensor.fk_configuracion ?? "",
        fk_cultivo: sensor.fk_cultivo ?? "",
        medicion: sensor.medicion ?? "",
      }));
    }
  }, [sensor, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando datos al backend:", formData);

    updateSensor({ id, ...formData }, {
      onSuccess: () => {
        console.log("✅ Sensor actualizado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar sensor:", error);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Sensor</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando sensor...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input label="Bancal" name="fk_bancal" value={formData.fk_bancal} onChange={handleChange} required />
            <Input label="Tipo de Sensor" name="fk_tipo_sensor" value={formData.fk_tipo_sensor} onChange={handleChange} required />
            <Input label="Configuración" name="fk_configuracion" value={formData.fk_configuracion} onChange={handleChange} required />
            <Input label="Cultivo" name="fk_cultivo" value={formData.fk_cultivo} onChange={handleChange} required />
            <Input label="Medición" type="number" step="0.01" name="medicion" value={formData.medicion} onChange={handleChange} required />

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isUpdating}>
                Guardar
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarSensorModal;
