import React, { Component } from "react";
import { BrowserRouter,Navigate, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Page404 from "./Paginas/PageError";
import Tablacliente from "./Tablas/TablaCliente";
// import Sidebar from "./Sidenav/Sidebar";
import DashboardFront from "./Paginas/DashboardFront";
import RegisterFront from "./Paginas/RegisterFront";
import UsuarioFront from "./Paginas/UsuariosFront";
import SettingsFront from "./Paginas/SettingsFront";
import DashboardSegunda from "./Paginas/DashboardSegunda";
import GuardedOperador from "./middleware/guardedOperador";
import GuardedAdmin from "./middleware/guardedAdmin";
import GuardedCliente from "./middleware/guardedCliente";


function App() {
  return (
    <div className='App '>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/Dashboard' element={
                <GuardedAdmin><DashboardFront /></GuardedAdmin> } />
          <Route path='/Dashboard2da' element={
           <GuardedCliente><DashboardSegunda /></GuardedCliente> } />
          <Route path='/tablacliente' element={<Tablacliente /> } />
          <Route path='/Opciones' element={
              <GuardedOperador><SettingsFront /></GuardedOperador>
           } />
          <Route path='/Usuarios' element={
             <GuardedAdmin><UsuarioFront /></GuardedAdmin> } />
          <Route path='/Usuarios/Agregar' element={
          <GuardedAdmin><RegisterFront /></GuardedAdmin>
           } />
          <Route path='/PageError' element={<Page404 /> } />
        <Route path='*' element={<Navigate replace to="/PageError"/> }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
