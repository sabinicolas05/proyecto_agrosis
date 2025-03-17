import { useState } from "react";
import { Button, Input, Select } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { useCreateEspecie } from "@/hooks/trazabilidad/especie/useCreateEspecie";
import { useFetchEspecie } from "@/hooks/trazabilidad/especie/useFetchEspecie";
import { toast } from "react-toastify";

const RegisterEspecieModal = ({ onClose }) => {
  useAuth();
  const { mutate: createEspecie, isLoading } = useCreateEspecie();
  const { data: tiposEspecies } = useFetchEspecie();

  const [formData, setFormData] = useState({
    fk_tipo_especie: "",
    nombre: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fk_tipo_especie || !formData.nombre) {
      toast.error("Los campos con * son obligatorios.");
      return;
    }

    console.log("📤 Enviando datos al backend:", formData);

    createEspecie(formData, {
      onSuccess: () => {
        toast.success("✅ Especie registrada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al registrar especie:", error);
        toast.error("Error al registrar especie.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Registrar Especie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Tipo de Especie *</label>
            <Select
              name="fk_tipo_especie"
              value={formData.fk_tipo_especie}
              onChange={(value) => handleChange("fk_tipo_especie", value)}
              options={
                tiposEspecies && Array.isArray(tiposEspecies)
                  ? tiposEspecies.map((tipo) => ({
                      value: tipo.id,
                      label: tipo.tipo,
                    }))
                  : []
              }
              placeholder="Seleccione un tipo"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Nombre *</label>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              required
            />
          </div>

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

export default RegisterEspecieModal;
