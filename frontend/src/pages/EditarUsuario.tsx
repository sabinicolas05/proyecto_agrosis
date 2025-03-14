import { useFetchUsuarioById } from "@/hooks/useFetchUsuarioById";
import { useUpdateUsuario } from "@/hooks/useUpdateUsuario";
import { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";

const EditarUsuarioModal = ({ id, onClose }) => {
  const { data: usuario, isLoading } = useFetchUsuarioById(id);
  const { mutate: updateUsuario, isLoading: isUpdating } = useUpdateUsuario();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    identificacion: "",
    is_staff: false,
    is_active: false,
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        username: usuario.username || "",
        first_name: usuario.first_name || "",
        last_name: usuario.last_name || "",
        email: usuario.email || "",
        identificacion: usuario.identificacion || "",
        is_staff: usuario.is_staff || false,
        is_active: usuario.is_active || false,
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(
      { id, ...formData },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
        
        {/* 🔹 Si está cargando, mostrar mensaje en lugar de retrasar la apertura del modal */}
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando usuario...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input label="Usuario" name="username" value={formData.username} onChange={handleChange} required />
            <Input label="Nombre" name="first_name" value={formData.first_name} onChange={handleChange} />
            <Input label="Apellido" name="last_name" value={formData.last_name} onChange={handleChange} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Input label="Identificación" name="identificacion" value={formData.identificacion} onChange={handleChange} required />
            
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} /> Staff
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} /> Activo
            </label>

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

export default EditarUsuarioModal;
