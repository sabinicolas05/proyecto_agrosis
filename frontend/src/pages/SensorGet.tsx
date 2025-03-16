import { useState } from "react";
import { useFetchSensors } from "@/hooks/useFetchSensors";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/react";
import EditarSensorModal from "@/pages/EditarSensor";
import RegisterSensorModal from "@/pages/registerModalSensor";
import useAuth from "@/hooks/useAuth";

const SensoresList = () => {
  useAuth();
  const { data: sensores, isLoading, error } = useFetchSensors();
  const [sensorSeleccionado, setSensorSeleccionado] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  if (error) return <p>Error al cargar sensores</p>;

  return (
    <DefaultLayout>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Sensores Registrados</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Bancal</th>
              <th className="px-4 py-2">Tipo de Sensor</th>
              <th className="px-4 py-2">Configuración</th>
              <th className="px-4 py-2">Cultivo</th>
              <th className="px-4 py-2">Medición</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sensores?.map((sensor) => (
              <tr key={sensor.id} className="border-b">
                <td className="px-4 py-2">{sensor.fk_bancal || "N/A"}</td>
                <td className="px-4 py-2">{sensor.fk_tipo_sensor || "N/A"}</td>
                <td className="px-4 py-2">{sensor.fk_configuracion || "N/A"}</td>
                <td className="px-4 py-2">{sensor.fk_cultivo || "N/A"}</td>
                <td className="px-4 py-2">{sensor.medicion}</td>
                <td className="px-4 py-2">
                  <Button
                    onClick={() => {
                      console.log("Editando sensor con ID:", sensor.id);
                      setSensorSeleccionado(sensor.id);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <br />

      <Button
        onClick={() => setMostrarModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar un Sensor
      </Button>

      {mostrarModal && <RegisterSensorModal onClose={() => setMostrarModal(false)} />}

      {sensorSeleccionado && (
        <EditarSensorModal
          id={sensorSeleccionado}
          onClose={() => {
            console.log("Cerrando modal de edición");
            setSensorSeleccionado(null);
          }}
        />
      )}
    </DefaultLayout>
  );
};

export default SensoresList;
