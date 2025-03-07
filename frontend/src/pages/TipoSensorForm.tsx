import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@heroui/react";
import { usePostTipoSensor } from "@/hooks/usePostTipoSensor";
import DefaultLayout from "@/layouts/default";

const TipoSensorForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveTipoSensor, isLoading } = usePostTipoSensor();

  const onSubmit = (formData) => {
    saveTipoSensor(formData, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Tipo de Sensor</h2>

        <Input label="Nombre" type="text" {...register("nombre", { required: true })} />
        <Textarea label="Tipo" {...register("tipo", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default TipoSensorForm;
