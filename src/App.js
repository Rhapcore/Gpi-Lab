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

function App() {
  return (
    <div className='App ' >
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/Dashboard' element={<DashboardFront /> } />
          <Route path='/Dashboard2da' element={<DashboardSegunda /> } />
          <Route path='/tablacliente' element={<Tablacliente /> } />
          <Route path='/Opciones' element={<SettingsFront /> } />
          <Route path='/Usuarios' element={<UsuarioFront /> } />
          <Route path='/Usuarios/Agregar' element={<RegisterFront /> } />
          <Route path='/PageError' element={<Page404 /> } />
        <Route path='*' element={<Navigate replace to="/PageError"/> }/>
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
