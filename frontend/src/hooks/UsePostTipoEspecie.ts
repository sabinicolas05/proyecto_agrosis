import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const postTipoEspecie = async (nuevoTipoEspecie: {
  tipo: string;
  descripcion: string;
  tiempo_crecimiento: number;
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/tipo_especie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoTipoEspecie),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el Tipo de Especie");
  }

  return response.json();
};

export const usePostTipoEspecie = () => {
  return useMutation({
    mutationFn: postTipoEspecie,
    onSuccess: (data) => {
      toast.success(`✅ Tipo de Especie "${data.tipo}" registrado correctamente`);
    },
    onError: () => {
      toast.error("❌ Error al registrar el Tipo de Especie");
    },
  });
};
