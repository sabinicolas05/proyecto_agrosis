import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { usePostConfiguration } from "@/hooks/sensores/useFetchConfigurations";
import DefaultLayout from "@/layouts/default";
import useAuth from "@/hooks/useAuth"

const SensorConfigForm = () => {
  useAuth()
  const { register, handleSubmit, reset } = useForm();
  const { mutate: saveConfiguration, isLoading } = usePostConfiguration();

  const onSubmit = (formData) => {
    saveConfiguration(formData, {
      onSuccess: () => {
        reset(); // 🔄 Limpia el formulario después del éxito
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Configurar Sensor</h2>

        <Input label="Tipo de Cultivo" type="text" {...register("tipo_cultivo", { required: true })} />
        <Input label="Tipo de Sensor" type="text" {...register("tipo_sensor", { required: true })} />
        <Input label="Valor Mínimo" type="number" step="0.01" {...register("valor_min", { required: true })} />
        <Input label="Valor Máximo" type="number" step="0.01" {...register("valor_max", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default SensorConfigForm;
