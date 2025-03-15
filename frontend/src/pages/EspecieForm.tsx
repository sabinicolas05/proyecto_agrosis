import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { usePostEspecie } from "@/hooks/usePostEspecie";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/useAuth"

const EspecieForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveEspecie, isLoading } = usePostEspecie();

  const onSubmit = (formData) => {
    saveEspecie(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Especie</h2>

        <Input label="ID del Tipo de Especie" type="number" {...register("fk_tipo_especie", { required: true })} />
        <Input label="Nombre de la Especie" type="text" {...register("nombre", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default EspecieForm;
