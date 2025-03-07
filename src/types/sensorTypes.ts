export interface Sensor {
    id: number;
    nombre_sensor: string;
    tipo_sensor: string;
    cultivo: string;
    unidad_medida: string;
    ubicacion: number;
    valor_min: number;
    valor_max: number;
  }
  //src\types\sensorTypes.ts