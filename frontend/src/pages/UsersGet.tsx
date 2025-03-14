import { useState } from "react";
import { useFetchUsuarios } from "@/hooks/useFetchUsuarios";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarUsuarioModal from "@/pages/EditarUsuario";

const UsuariosList = () => {
  const { data: usuarios, isLoading, error } = useFetchUsuarios();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null);

  if (error) return <p>Error al cargar usuarios</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Usuarios Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Staff</th>
              <th className="px-4 py-2">Activo</th>
              <th className="px-4 py-2">Fecha de Registro</th>
              <th className="px-4 py-2">Último Inicio de Sesión</th>
              <th className="px-4 py-2">Identificación</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((usuario) => (
              <tr key={usuario.identificacion} className="border-b">
                <td className="px-4 py-2">{usuario.username}</td>
                <td className="px-4 py-2">{usuario.is_staff ? "Sí" : "No"}</td>
                <td className="px-4 py-2">{usuario.is_active ? "Sí" : "No"}</td>
                <td className="px-4 py-2">{new Date(usuario.date_joined).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  {usuario.last_login ? new Date(usuario.last_login).toLocaleDateString() : "Nunca"}
                </td>
                <td className="px-4 py-2">{usuario.identificacion}</td>
                <td className="px-4 py-2">{usuario.email}</td>
                <td className="px-4 py-2">
                <Button 
  onClick={() => {
    console.log("🖱️ Click en Editar. ID seleccionado:", usuario.id);
    setUsuarioSeleccionado(usuario.id);
  }}
  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
>
  Editar
</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mostrar modal inmediatamente, pero indicar "Cargando..." si los datos aún no están listos */}
      {usuarioSeleccionado && (
        <EditarUsuarioModal 
          id={usuarioSeleccionado} 
          onClose={() => setUsuarioSeleccionado(null)}
        />
      )}
    </DefaultLayout>
  );
};

export default UsuariosList;
