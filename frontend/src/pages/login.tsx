import { Button, Input } from "@heroui/react";
import { toast } from "react-toastify";
import Label from "@/components/Label";
import { useLogin } from "@/hooks/useFetchLogin";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const { formData, handleChange, handleSubmit } = useLogin();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
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
              placeholder="Contraseña"
            />
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </section>
  );
}
