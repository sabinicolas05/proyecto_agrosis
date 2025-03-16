import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { usePostLote } from "@/hooks/trazabilidad/lote/usePostLote";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/useAuth"

const LoteForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveLote, isLoading } = usePostLote();

  const onSubmit = (formData) => {
    saveLote(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Lote</h2>

        <Input label="Nombre" type="text" {...register("nombre", { required: true })} />
        <Input label="Descripción" type="text" {...register("descripcion", { required: true })} />
        <Input label="Ubicación" type="number" step="0.0001" {...register("ubicacion", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default LoteForm;
