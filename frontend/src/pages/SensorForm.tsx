import { useForm } from "react-hook-form";
import { Button, Input } from "@heroui/react";
import { usePostSensor } from "@/hooks/usePostSensor";
import DefaultLayout from "@/layouts/default";
import { Sensor } from "@/types/sensorTypes";

const SensorForm = () => {
  const { register, handleSubmit, reset } = useForm<Sensor>(); // ⬅️ Ahora está tipado correctamente
  const { mutate: saveSensor, isLoading } = usePostSensor();

  const onSubmit = (formData: Sensor) => { // ⬅️ También tipamos `formData`
    formData.medicion = parseFloat(formData.medicion.toString()); // Asegura que `medicion` sea un número

    saveSensor(formData, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Registrar Sensor</h2>

        <Input label="ID Bancal" type="number" {...register("fk_bancal", { required: true })} />
        <Input label="ID Tipo de Sensor" type="number" {...register("fk_tipo_sensor", { required: true })} />
        <Input label="ID Configuración" type="number" {...register("fk_configuracion", { required: true })} />
        <Input label="ID Cultivo" type="number" {...register("fk_cultivo", { required: true })} />
        <Input label="Medición" type="number" step="0.01" {...register("medicion", { required: true })} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </form>
    </DefaultLayout>
  );
};

export default SensorForm;
