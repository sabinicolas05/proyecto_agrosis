import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const postEspecie = async (nuevaEspecie: { fk_tipo_especie: number; nombre: string }) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/especie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaEspecie),
  });

  if (!response.ok) {
    throw new Error("Error al registrar la Especie");
  }

  return response.json();
};

export const usePostEspecie = () => {
  return useMutation({
    mutationFn: postEspecie,
    onSuccess: (data) => {
      toast.success(`✅ Especie "${data.nombre}" registrada correctamente`);
    },
    onError: () => {
      toast.error("❌ Error al registrar la Especie");
    },
  });
};
