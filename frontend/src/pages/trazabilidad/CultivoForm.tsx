import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { usePostCultivo } from "@/hooks/trazabilidad/cultivo/usePostCultivo";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/useAuth"

const CultivoForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveCultivo, isLoading } = usePostCultivo();

  const onSubmit = (formData) => {
    saveCultivo(formData, {
      onSuccess: () => {
        reset(); // 🔄 Limpia el formulario al registrar con éxito
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Cultivo</h2>

        <Input label="ID Semillero" type="number" {...register("fk_semillero", { required: true })} />
        <Input label="ID Especie" type="number" {...register("fk_especie", { required: true })} />
        <Input label="Nombre del Cultivo" type="text" {...register("nombre", { required: true })} />
        <Textarea label="Descripción" {...register("descripcion", { required: true })} />
        <Input label="Cantidad" type="number" {...register("cantidad", { required: true })} />
        <Input label="Fecha de Siembra" type="date" {...register("fecha_siembra", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default CultivoForm;
