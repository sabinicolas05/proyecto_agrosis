import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateBancal } from "@/hooks/trazabilidad/bancal/useCreateBancal";
import { toast } from "react-toastify";

const RegisterBancalModal = ({ onClose }) => {
  useAuth();
  const { mutate: createBancal, isLoading } = useCreateBancal();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
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
    
    if (!formData.nombre || !formData.descripcion || !formData.ubicacion) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);
    
    createBancal(formData, {
      onSuccess: () => {
        toast.success("✅ Bancal registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar bancal:", error);
        toast.error("Error al registrar bancal.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Bancal</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre *</label>
          <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          
          <label>Descripción *</label>
          <Input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} required />

          <label>Ubicación *</label>
          <Input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
          
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

export default RegisterBancalModal;
