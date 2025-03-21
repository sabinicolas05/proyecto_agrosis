import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener una venta por su ID
const fetchVentaById = async (id: string) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`http://127.0.0.1:8000/api/venta/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

// Hook personalizado para obtener una venta por ID
export const useFetchVentaById = (id: string) => {
  return useQuery({
    queryKey: ["venta", id],
    queryFn: () => fetchVentaById(id),
    enabled: !!id, // Solo ejecuta la query si el ID es válido
  });
};
