import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

{/*  TRAZABILIDAD */}
import SensorConfigForm from "@/pages/sensor/configuracion/ConfigsensorGet";
import LoginForm from "@/pages/login";
import RegisterForm from "./pages/register";
import TipoEspecieForm   from "./pages/tipo_especie/tipo_especie_Get";
import EspecieForm from "./pages/especie/EspecieGet";
import LoteForm from "./pages/lote/LoteGet";
import SemilleroForm from "./pages/semillero/SemilleroGet";
import CultivoForm from "./pages/trazabilidad/cultivo/CultivoGet";
import ActividadForm from "./pages/actividad/ActividadForm";
import SensorForm from "./pages/sensor/SensorGet";
import TipoSensoresList from "./pages/sensor/tipo_sensor/TipoSensorGet";
import UsuariosList from "./pages/user/UsersGet";
import EditarUsuarioModal from "./pages/user/EditarUsuario";
import RegisterUserModal from "./pages/user/registerModalUsers";
import BancalesList from "./pages/bancal/BancalGet";
import SemillerosList from "./pages/semillero/SemilleroGet";
{/*  INVENTARIO */}
import HerramientasList from "./pages/inventario/herramientas/HerramientaGet";
import TipoHerramientasList from "./pages/inventario/tipo_herramientas/TipoHerramientaGet";
import TipoInsumosList from "./pages/inventario/tipo_insumo/TipoInsumoGet";
import InsumosList from "./pages/inventario/insumo/InsumoGet";
{/*  FINANZAS */}
import PagoList from "./pages/finanzas/pago/PagoGet";
import ProduccionList from "./pages/finanzas/produccion/ProduccionGet";
import ResiduosList from "./pages/finanzas/residuo/ResiduoGet";
import VentasList from "./pages/finanzas/ventas/VentasGet";


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
          <Route element={<SemillerosList />} path="/cultivo/actividades" />

          
          {/* 🔹 INVENTARIO */}
          <Route element={<HerramientasList/>} path="/inventario/herramientas" />
          <Route element={<TipoHerramientasList/>} path="/inventario/tipo_herramienta" />
          <Route element={<TipoInsumosList/>} path="/inventario/tipo_insumo" />
          <Route element={<InsumosList/>} path="/inventario/insumo" />

           {/* 🔹 FINANZAS */}
           <Route element={<PagoList/>} path="/finanzas/pagos" />
           <Route element={<ProduccionList/>} path="/finanzas/produccion" />
           <Route element={<ResiduosList/>} path="/finanzas/residuos" />
           <Route element={<VentasList/>} path="/finanzas/venta" />


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

