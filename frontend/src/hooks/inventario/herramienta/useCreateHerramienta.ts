import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface  Herramienta {
  nombre: string;
  unidades: number;
  precioCU: number;
  estado: string;
  fk_tipo_herramienta: number | null;
  
}

const createHerramienta = async (nuevaHerramienta: Herramienta) => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/herramienta/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(nuevaHerramienta),
  });

  if (!response.ok) {
    throw new Error("Error al registrar herramienta");
  }

  return response.json();
};

export const useCreateHerramienta = () => {
  return useMutation({
    mutationFn: createHerramienta,
    onSuccess: () => {
      toast.success("✅ Herrameinta registrada exitosamente");
    },
    onError: () => {
      toast.error("❌ Error al registrar una herramienta");
    },
  });
};
