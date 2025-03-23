import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sensor } from "@/types/sensorTypes";

const updateSensor = async (sensor: Sensor): Promise<Sensor> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://127.0.0.1:8000/api/sensor/${sensor.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sensor),
  });

  if (!response.ok) throw new Error("Error al actualizar el sensor");
  return response.json();
};

export const useUpdateSensor = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSensor, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sensores"]); // Refresca la lista de sensores
    },
  });
};
