import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import { useCreateSensor } from "@/pages/useCreateSensor"; // Importa el hook
import useAuth from "@/hooks/useAuth";

const RegisterSensorModal = ({ onClose }) => {
  useAuth();
  const { mutate: createSensor, isLoading } = useCreateSensor();
  
  const [formData, setFormData] = useState({
    fk_bancal: "",
    fk_tipo_sensor: "",
    fk_configuracion: "",
    fk_cultivo: "",
    medicion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_bancal || !formData.fk_tipo_sensor || !formData.medicion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    createSensor(formData, {
      onSuccess: () => {
        toast.success("Sensor registrado correctamente");
        onClose(); // Cierra el modal
      },
      onError: (error) => {
        console.error("❌ Error al registrar sensor:", error);
        toast.error("Error al registrar sensor.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Sensor</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fk_bancal">Bancal *</label>
          <Input name="fk_bancal" value={formData.fk_bancal} onChange={handleChange} required />

          <label htmlFor="fk_tipo_sensor">Tipo de Sensor *</label>
          <Input name="fk_tipo_sensor" value={formData.fk_tipo_sensor} onChange={handleChange} required />

          <label htmlFor="fk_configuracion">Configuración</label>
          <Input name="fk_configuracion" value={formData.fk_configuracion} onChange={handleChange} />

          <label htmlFor="fk_cultivo">Cultivo</label>
          <Input name="fk_cultivo" value={formData.fk_cultivo} onChange={handleChange} />

          <label htmlFor="medicion">Medición *</label>
          <Input type="number" name="medicion" value={formData.medicion} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" onClick={onClose} className="bg-gray-400">Cancelar</Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500">
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSensorModal;
