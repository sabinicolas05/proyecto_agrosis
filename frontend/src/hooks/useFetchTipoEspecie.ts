import { useQuery } from "@tanstack/react-query";

const fetchTiposEspecie = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_especie/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los Tipos de Especie");
  }

  return response.json();
};

export const useFetchTipoEspecie = () => {
  return useQuery({
    queryKey: ["tipoEspecie"],
    queryFn: fetchTiposEspecie,
  });
};
