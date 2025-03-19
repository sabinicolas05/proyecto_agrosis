import { useState } from "react";
import { Button, Input } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateInsumo } from "@/hooks/inventario/insumos/useCreateInsumo";
import { toast } from "react-toastify";

const RegisterInsumoModal = ({ onClose }) => {
  useAuth();
  const { mutate: createInsumo, isLoading } = useCreateInsumo();

  const [formData, setFormData] = useState({
    cantidad: "",
    precio: "",
    tipo_empacado: "",
    tipo: "",
    unidadMedida: "",
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

    // Validación de campos obligatorios
    if (!formData.cantidad || !formData.precio || !formData.tipo || !formData.unidadMedida) {
      toast.error("⚠️ Todos los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createInsumo(formData, {
      onSuccess: () => {
        toast.success("✅ Insumo registrado correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar el insumo:", error);
        toast.error("❌ Error al registrar el insumo.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">📦 Registrar Insumo</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label>Cantidad *</label>
          <Input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />

          <label>Precio *</label>
          <Input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required />

          <label>Tipo de Empaque</label>
          <Input type="text" name="tipo_empacado" value={formData.tipo_empacado} onChange={handleChange} />

          <label>Tipo *</label>
          <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />

          <label>Unidad de Medida *</label>
          <Input type="text" name="unidadMedida" value={formData.unidadMedida} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
              ❌ Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {isLoading ? "Registrando..." : "✅ Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterInsumoModal;
