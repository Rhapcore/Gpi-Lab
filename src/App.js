import React from "react";
import { BrowserRouter,Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Page404 from "./Paginas/PageError";
import Tablacliente from "./Tablas/TablaCliente";
import DashboardFront from "./Paginas/DashboardFront";
import RegisterFront from "./Paginas/RegisterFront";
import UsuarioFront from "./Paginas/UsuariosFront";
import SettingsFront from "./Paginas/SettingsFront";
import DashboardSegunda from "./Paginas/DashboardSegunda";
import GuardedOperador from "./middleware/guardedOperador";
import GuardedAdmin from "./middleware/guardedAdmin";
import DashboardFrontOperador from "./Paginas/PaginasParaOperador/DashboardFrontOperador";
import DashboardSegundaOperador from "./Paginas/PaginasParaOperador/DashboardSegundaOperador";
import DashboardSegundaCliente from "./Paginas/PaginasParaCliente/DashboardSegundaOperador";
import GuardedCliente from "./middleware/guardedCliente";
import AAcuerdoComercial from "./Paginas/AcuerdoComercial";
import HistorialFront from "./Paginas/HistorialFront";

function App() {
  return (
    <div className='App '>
      <BrowserRouter>
      <Routes>
          {/*=============== ADMINISTRADOR ===============*/}

            <Route path='/ADashboard' element={
                <GuardedAdmin><DashboardFront /></GuardedAdmin>        } />
            <Route path='/AAcuerdoComercial' element={
                <GuardedAdmin><AAcuerdoComercial/></GuardedAdmin>      } />
            <Route path='/ADashboard2da' element={
                <GuardedAdmin><DashboardSegunda /></GuardedAdmin>      } />
            <Route path='/AUsuarios' element={
                <GuardedAdmin><UsuarioFront /></GuardedAdmin>          } />
            <Route path='/Usuarios/Agregar' element={
                <GuardedAdmin><RegisterFront /></GuardedAdmin>         } />
            <Route path='/ATablacliente' element={
                <GuardedAdmin><Tablacliente /></GuardedAdmin>          } />
            <Route path='/Opciones' element={
                <GuardedAdmin><SettingsFront /></GuardedAdmin>         } />
            <Route path='/Historial' element={
                <GuardedAdmin><HistorialFront /></GuardedAdmin>         } />

          {/*=============== OPERADOR ===============*/}

          <Route path='/ODashboard' element={
                <GuardedOperador><DashboardFrontOperador /></GuardedOperador> } />
          <Route path='/ODashboard2da' element={
                <GuardedOperador><DashboardSegundaOperador /></GuardedOperador> } />

          {/*=============== CLIENTE ===============*/}

          <Route path='/CDashboard2da' element={
                <GuardedCliente><DashboardSegundaCliente/></GuardedCliente>        } />

          {/*===============  ERROR ===============*/}

          <Route path='/PageError' element={<Page404 /> } />

          {/*=============== No INGRESADO  ===============*/}

          <Route path='/' element={<Login />                          } />
          <Route path='*' element={<Navigate replace to="/PageError"/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
