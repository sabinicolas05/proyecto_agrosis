import { useState, useEffect } from "react";
import { useFetchTipoHerramientaById } from "@/hooks/inventario/tipoherramienta/useFetchTipoHerramientaById";
import { useUpdateTipoHerramienta } from "@/hooks/inventario/tipoherramienta/useUpdateTipoHerramienta";
import useAuth from "@/hooks/useAuth";
import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";

const EditarTipoHerramientaModal = ({ id, onClose }) => {
  useAuth();
  const { data: tipoherramienta, isLoading } = useFetchTipoHerramientaById(id);
  const { mutate: updateTipoHerramienta, isLoading: isUpdating } = useUpdateTipoHerramienta();

  const [formData, setFormData] = useState({
    tipo:"",
  });

  useEffect(() => {
    if (tipoherramienta && !isLoading) {
      setFormData({
        tipo: tipoherramienta.tipo ?? "",
       
      });
          
      }

    }, [tipoherramienta, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;9
    setFormData((prev) => ({ ...prev, [name]: value}));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.tipo ) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    updateTipoHerramienta({ id, ...formData }, {
      onSuccess: () => {
        toast.success("✅ tipo de Herramienta actualizada correctamente");
        onClose();
      },
      onError: (error) => {
        console.error("❌ Error al actualizar el tipo de herramienta:", error);
        toast.error("❌ Error al actualizarel tipo de  herramienta");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar tipo de herramienta</h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Cargando tipo de herramienta...</p>
        ) : (
          <form onSubmit={handleUpdate}>
            <label>tipo *</label>
            <Input type="text" name="tipo" value={formData.tipo} onChange={handleChange} required />

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


export default EditarTipoHerramientaModal;