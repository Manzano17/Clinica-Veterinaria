import React from 'react'
import ReactDOM from 'react-dom/client'
import FormularioInicioSesion from './Components/FormInicioSesion'
import FormAgregarMascota from './Components/FormAgregarMascota'
import Inicio from './Components/Inicio'

import {BrowserRouter, Route, Routes} from "react-router-dom"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/agregarMascota' element={<FormAgregarMascota/>} />
        <Route path='/' element={<FormularioInicioSesion/>} />
      </Routes>
    </BrowserRouter>

    
  </React.StrictMode>,
)
