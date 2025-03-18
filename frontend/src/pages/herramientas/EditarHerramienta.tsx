import { useState, useEffect } from "react";
import { useFetchHerramientaById } from "@/hooks/inventario/herramienta/useFetchHerramientaById";
import { useUpdateHerramienta } from "@/hooks/inventario/herramienta/useUpdateHerramienta";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarHerramientaModal = ({ id, onClose }) => {
  useAuth();
  const { data: herramienta, isLoading } = useFetchHerramientaById(id);
  const { mutate: updateHerramienta, isLoading: isUpdating } = useUpdateHerramienta();

  const [formData, setFormData] = useState({
    nombre:"",
    unidades: "",
    precioCU: "",
    estado: "",
  });

  useEffect(() => {
    if (herramienta && !isLoading) {
      setFormData({
        nombre: herramienta.nombre ?? "",
        unidades: herramienta.unidades ?? "",
        precioCU: herramienta.precioCU ?? "",
        estado: herramienta.estado ?? "",
      });
          
      }

    }, [herramienta, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;9
    setFormData((prev) => ({ ...prev, [name]: value}));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.unidades || !formData.precioCU || !formData.estado) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateHerramienta({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ Herramienta actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar herramienta:", error);
        toast.error("❌ Error al actualizar herramienta");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar herramienta</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando herramienta...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>Nombre *</label>
            <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label> unidades *</label>
            <Input type="number" name="unidades" value={formData.unidades} onChange={handleChange} required />

            <label>precioCU *</label>
            <Input type="number" name="precioCU" value={formData.precioCU} onChange={handleChange} required />

            <label>estado *</label>
            <Input type="text" name="estado" value={formData.estado} onChange={handleChange} required />


            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isUpdating}>
                {isUpdating ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


export default EditarHerramientaModal;