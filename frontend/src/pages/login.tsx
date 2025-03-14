import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import Label from "@/components/Label";
import { useLogin } from "@/hooks/useFetchLogin";
import "react-toastify/dist/ReactToastify.css";

import LogoAgrosis from "@/assets/def_AGROSIS_LOGOTIC.png";
import SenaLogo from "@/assets/logo sena.png";

export default function LoginForm() {
  const { formData, handleChange, handleSubmit } = useLogin();

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Logo SENA en la esquina superior izquierda */}
      <img src={SenaLogo} alt="Logo SENA" className="absolute top-4 left-4 w-20" />
      
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Sección Izquierda - Formulario */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">AGROSIS</h1>
          <h1 className="text-2xl font-bold mb-4">⚠️Debe crear un superuser desde cmd Backend para ingresar o registrar un usuario con acceso⚠️</h1>
          <p className="mb-4">¡Bienvenido de vuelta!</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Usuario.."
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
            <div className="text-sm text-gray-500">
              <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
              <br />
              ¿No tienes una cuenta?<a href="/register" className="hover:underline"> Regístrate aquí</a>
            </div>
            <Button type="submit" className="w-full bg-green-600 text-white">Iniciar</Button>
          </form>
        </div>

        {/* Sección Derecha - Imagen y mensaje */}
        <div className="w-1/2 bg-gray-200 flex flex-col items-center justify-center p-8">
          <p className="text-center text-lg font-semibold mb-4">¡Recuerda también descargar la App Móvil!</p>
          <img src={LogoAgrosis} alt="Logo Agrosis" className="w-40" />
        </div>

        
      </div>
    </section>
  );
}