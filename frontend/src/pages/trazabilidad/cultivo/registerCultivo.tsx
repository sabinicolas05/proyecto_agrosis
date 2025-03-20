import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateCultivo } from "@/hooks/trazabilidad/cultivo/useCreateCultivo";
import { toast } from "react-toastify";

const RegisterCultivoModal = ({ onClose }) => {
  useAuth();
  const { mutate: createCultivo, isLoading } = useCreateCultivo();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cantidad: "",
    fecha_siembra: "",
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
    
    if (!formData.nombre || !formData.fecha_siembra || !formData.cantidad) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createCultivo(formData, {
      onSuccess: () => {
        toast.success("✅ Cultivo registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar el cultivo:", error);
        toast.error("Error al registrar el cultivo.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Cultivo</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          
          <label>Descripción</label>
          <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
          
          <label>Cantidad *</label>
          <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
          
          <label>Fecha de Siembra *</label>
          <Input type="date" name="fecha_siembra" value={formData.fecha_siembra} onChange={handleChange} required />
          
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

export default RegisterCultivoModal;
