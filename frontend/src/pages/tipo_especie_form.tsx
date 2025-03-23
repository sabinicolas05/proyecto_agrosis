import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { usePostTipoEspecie } from "@/hooks/UsePostTipoEspecie";
import DefaultLayout from "@/layouts/default";

const TipoEspecieForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveTipoEspecie, isLoading } = usePostTipoEspecie();

  const onSubmit = (formData) => {
    saveTipoEspecie(formData, {
      onSuccess: () => {
        reset(); // 🔄 Limpia el formulario después del éxito
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Tipo de Especie</h2>

        <Input label="Tipo" type="text" {...register("tipo", { required: true })} />
        <Textarea label="Descripción" {...register("descripcion", { required: true })} />
        <Input
          label="Tiempo de Crecimiento (días)"
          type="number"
          {...register("tiempo_crecimiento", { required: true, valueAsNumber: true })}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default TipoEspecieForm;
