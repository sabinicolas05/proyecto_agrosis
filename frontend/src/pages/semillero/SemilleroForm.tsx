import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { usePostSemillero } from "@/hooks/trazabilidad/semillero/usePostSemillero";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/useAuth"

const SemilleroForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveSemillero, isLoading } = usePostSemillero();

  const onSubmit = (formData) => {
    saveSemillero(formData, {
      onSuccess: () => {
        reset(); // 🔄 Limpia el formulario al registrar con éxito
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Semillero</h2>

        <Input label="ID Especie" type="number" {...register("fk_especie", { required: true })} />
        <Input label="ID Lote" type="number" {...register("fk_lote", { required: true })} />
        <Input label="Nombre de la Semilla" type="text" {...register("nombre_semilla", { required: true })} />
        <Input label="Fecha de Siembra" type="date" {...register("fecha_siembra", { required: true })} />
        <Input label="Fecha Estimada" type="date" {...register("fecha_estimada", { required: true })} />
        <Input label="Unidades" type="number" {...register("unidades", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default SemilleroForm;
