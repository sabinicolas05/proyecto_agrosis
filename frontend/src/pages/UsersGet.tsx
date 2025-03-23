import { useFetchUsuarios } from "@/hooks/useFetchUsuarios";
import DefaultLayout from "@/layouts/default";

const UsuariosList = () => {
  const { data: usuarios, isLoading, error } = useFetchUsuarios();

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  return (
        <DefaultLayout>
    
    <div>
      <h2 className="text-lg font-bold">Usuarios Registrados</h2>
      <ul className="space-y-2">
        {usuarios?.map((usuario) => (
          <li key={usuario.identificacion} className="border p-2 rounded-lg shadow-md">
            <p><strong>Usuario:</strong> {usuario.username}</p>
            <p><strong>Nombre:</strong> {usuario.first_name} {usuario.last_name}</p>
            <p><strong>Staff:</strong> {usuario.is_staff ? "Sí" : "No"}</p>
            <p><strong>Activo:</strong> {usuario.is_active ? "Sí" : "No"}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(usuario.date_joined).toLocaleDateString()}</p>
            <p><strong>Identificación:</strong> {usuario.identificacion}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
          </li>
        ))}
      </ul>
    </div>
        </DefaultLayout>
    
  );
};

export default UsuariosList;
