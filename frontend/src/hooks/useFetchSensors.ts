import { useQuery } from "@tanstack/react-query";
import { Sensor } from "@/types/sensorTypes";

const fetchSensors = async (): Promise<Sensor[]> => {
  const response = await fetch("http://127.0.0.1:8000/api/sensor/");
  if (!response.ok) throw new Error("Error al obtener sensores");
  return response.json();
};

export const useFetchSensors = () => {
  return useQuery({ queryKey: ["sensores"], queryFn: fetchSensors });
};
