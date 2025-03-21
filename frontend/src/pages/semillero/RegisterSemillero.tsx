import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateSemillero } from "@/hooks/trazabilidad/semillero/useCreateSemillero";
import { toast } from "react-toastify";

const RegisterSemilleroModal = ({ onClose }) => {
  useAuth();
  const { mutate: createSemillero, isLoading } = useCreateSemillero();

  const [formData, setFormData] = useState({
    nombre_semilla: "",
    fecha_siembra: "",
    fecha_estimada: "",
    unidades: "",
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

    if (!formData.nombre_semilla || !formData.fecha_siembra || !formData.fecha_estimada || !formData.unidades) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createSemillero(formData, {
      onSuccess: () => {
        toast.success("✅ Semillero registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar semillero:", error);
        toast.error("Error al registrar semillero.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Semillero</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la Semilla *</label>
          <Input type="text" name="nombre_semilla" value={formData.nombre_semilla} onChange={handleChange} required />

          <label>Fecha de Siembra *</label>
          <Input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />

          <label>Fecha Estimada *</label>
          <Input type="date" name="fecha_estimada" value={formData.fecha_estimada} onChange={handleChange} required />

          <label>Unidades *</label>
          <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSemilleroModal;
