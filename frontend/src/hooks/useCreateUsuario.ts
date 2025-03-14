import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Función que maneja el registro de un nuevo usuario (POST)
const createUsuarioModal = async (usuario: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado

  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.post(
    "http://127.0.0.1:8000/api/usuario/", // Endpoint de creación de usuario
    usuario, // Datos del nuevo usuario
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json", // Tipo de contenido
      },
    }
  );

  return data;
};

// Hook que envuelve la lógica de la mutación (registro)
export const useCreateUsuarioModal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUsuarioModal, // Función de registro de usuario
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] }); // Refresca la lista de usuarios después de un registro exitoso
    },
    onError: (error: any) => {
      console.error("Error al registrar el usuario:", error);
    },
  });
};

export default createUsuarioModal;
// Este hook se puede importar en la página donde se quiera utilizar, por ejemplo:
// import { useCreateUsuarioModal } from 'path-to-this-file';
