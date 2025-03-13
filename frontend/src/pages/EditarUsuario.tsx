import { useParams, useNavigate } from "react-router-dom";
import { useFetchUsuarioById } from "@/hooks/useFetchUsuarioById";
import { useUpdateUsuario } from "@/hooks/useUpdateUsuario";
import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";

const EditarUsuario = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: usuario, isLoading } = useFetchUsuarioById(id!);
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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUsuario(
      { id: id!, ...formData },
      {
        onSuccess: () => navigate("/usuarios"),
      }
    );
  };

  return (
    <DefaultLayout>
      <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded">
        <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
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
          <Button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" disabled={isUpdating}>
            Guardar
          </Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditarUsuario;
