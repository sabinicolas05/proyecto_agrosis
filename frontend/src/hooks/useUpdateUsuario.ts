import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateUsuario = async ({ id, ...usuario }: any) => {
  const { data } = await axios.put(`http://localhost:8000/api/usuarios/${id}/`, usuario);
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