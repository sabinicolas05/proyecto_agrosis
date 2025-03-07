import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Semillero {
  fk_especie: number;
  fk_lote: number;
  nombre_semilla: string;
  fecha_siembra: string;
  fecha_estimada: string;
  unidades: number;
}

const postSemillero = async (nuevoSemillero: Semillero) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/semillero/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevoSemillero),
  });

  if (!response.ok) {
    throw new Error("Error al registrar el semillero");
  }

  return response.json();
};

export const usePostSemillero = () => {
  return useMutation({
    mutationFn: postSemillero,
    onSuccess: (data) => {
      toast.success(`✅ Semillero "${data.nombre_semilla}" registrado`);
    },
    onError: () => {
      toast.error("❌ Error al registrar el semillero");
    },
  });
};
