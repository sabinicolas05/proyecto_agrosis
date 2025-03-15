import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SensorConfigForm from "@/pages/sensorConfigForm";
import LoginForm from "@/pages/login";
import RegisterForm from "./pages/register";
import TipoEspecieForm   from "./pages/tipo_especie_form";
import EspecieForm from "./pages/EspecieForm";
import LoteForm from "./pages/LoteForm";
import SemilleroForm from "./pages/SemilleroForm";
import CultivoForm from "./pages/CultivoForm";
import ActividadForm from "./pages/ActividadForm";
import SensorForm from "./pages/SensorForm";
import TipoSensorForm from "./pages/TipoSensorForm";
import UsuariosList from "./pages/UsersGet";
import EditarUsuarioModal from "./pages/EditarUsuario";
import RegisterUserModal from "./pages/registerModalUsers";

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
          <Route element={<TipoSensorForm />} path="/iot/tipo-sensor" />
          <Route element={<TipoEspecieForm />} path="cultivo/tipoespecie/" />
          <Route element={<EspecieForm />} path="cultivo/especies/" />
          <Route element={<LoteForm />} path="cultivo/lotes/" />
          <Route element={<SemilleroForm />} path="/semilleros" />
          <Route element={<CultivoForm />} path="/cultivo/cultivo" />
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

