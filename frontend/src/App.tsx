import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SensorConfigForm from "@/pages/sensor/configuracion/ConfigsensorGet";
import LoginForm from "@/pages/login";
import RegisterForm from "./pages/register";
import TipoEspecieForm   from "./pages/especie/tipo_especie_form";
import EspecieForm from "./pages/especie/EspecieForm";
import LoteForm from "./pages/lote/LoteGet";
import SemilleroForm from "./pages/semillero/SemilleroForm";
import CultivoForm from "./pages/trazabilidad/CultivoForm";
import ActividadForm from "./pages/actividad/ActividadForm";
import SensorForm from "./pages/sensor/SensorGet";
import TipoSensoresList from "./pages/sensor/tipo_sensor/TipoSensorGet";
import UsuariosList from "./pages/user/UsersGet";
import EditarUsuarioModal from "./pages/user/EditarUsuario";
import RegisterUserModal from "./pages/user/registerModalUsers";
import BancalesList from "./pages/bancal/BancalGet";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* 🔹 Login sin Navbar */}
        <Route element={<LoginForm />} path="/" />

        {/* 🔹 Rutas protegidas con Navbar */}
        <Route
          element={
              <Outlet />
          }
        >
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<IndexPage />} path="/inicio" />
          <Route element={<SensorConfigForm />} path="/iot/configuracion" />
          <Route element={<SensorForm />} path="/iot/sensores" />
          <Route element={<TipoSensoresList />} path="/iot/tipo-sensor" />
          <Route element={<TipoEspecieForm />} path="cultivo/tipoespecie/" />
          <Route element={<EspecieForm />} path="cultivo/especies/" />
          <Route element={<LoteForm />} path="cultivo/lotes/" />
          <Route element={<SemilleroForm />} path="/semilleros" />
          <Route element={<CultivoForm />} path="/cultivo/cultivo" />
          <Route element={<BancalesList />} path="/cultivo/bancal" />
          <Route element={<ActividadForm />} path="/cultivo/actividades" />
          <Route element={<UsuariosList />} path="/usuarios" />
          <Route element={<EditarUsuarioModal />} path="/usuarios/editar/:id" />
          <Route element={<RegisterUserModal/>} path="/usuarios/editar/:id" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Route>
      </Routes>
    </>
  );
}

export default App;

