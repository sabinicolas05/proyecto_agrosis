import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateUsuario = async ({ id, ...usuario }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.put(
    `http://127.0.0.1:8000/api/usuario/${id}/`,
    usuario,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] }); // Refresca la lista de usuarios
    },
  });
};

//Importado en src\pages\EditarUsuario.tsx
