import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTipoSensor = async ({ id, ...tipoSensor }: any) => {
  const token = localStorage.getItem("token"); // Obtiene el token almacenado
  
  axios.defaults.withCredentials = true; // Habilita el envío de cookies si es necesario

  const { data } = await axios.patch( // Cambiar de PUT a PATCH
    `http://127.0.0.1:8000/api/tiposensor/${id}/`,
    tipoSensor,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

export const useUpdateTipoSensor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTipoSensor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipoSensores"] }); // Refresca la lista de tipos de sensores
    },
  });
};

// Importado en src/pages/EditarTipoSensor.tsx
