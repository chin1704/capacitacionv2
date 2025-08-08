import './styles/App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './modules/auth/views/Login';
import MenuPrincipal from './components/MenuPrincipal';
import Usuarios from './modules/usuarios/views/Usuarios';
import Error404 from './components/Error404';
import Paciente from './modules/pacientes/views/Paciente';
import DetallePaciente from './modules/pacientes/views/DetallePaciente';
import PersonalSalud from './modules/personalsalud/views/PersonalSalud';  
import DetallePersonalSalud from './modules/personalsalud/views/DetallePersonalSalud';
import Atencion from './modules/atencion/views/Atencion';
import NuevaAtencionMedica from './modules/atencion/views/NuevaAtencionMedica';
import Historia from './modules/historia/views/Historia';
import Terapia from './modules/terapia/views/Terapia';
import NuevaTerapia from './modules/terapia/views/NuevaTerapia';
import AccessDenied from './components/AccessDenied';
import Configuracion from './modules/configuracion/views/Configuracion';
import { MenuProvider } from './components/base/MenuContext';
import { PacienteProvider } from './components/base/PacienteContext';
import Perfil from './modules/usuarios/views/Perfil';
import PrivateRoute from './components/PrivateRoute';


import NuevoTipoPersona from "./modules/comunidad/tipo_persona/components/tipo_archivo"
import CrearProvincia from './modules/comunidad/provincia/components/crearProvincia';
import VerProvincia from './modules/comunidad/provincia/components/verProvincia';
import CrearPersona from './modules/comunidad/persona/components/crearPersona';

import Capacitaciones from './modules/capacitacion/views/Capacitaciones';
import NuevaCapacitacion from './modules/capacitacion/views/NuevaCapacitacion';
import EditarCapacitacion from './modules/capacitacion/views/EditarCapacitacion';


//--------------------------------------------------------------------------------------------
import CategoriaCurso from './modules/categoriacurso/views/CategoriaCurso';
import NuevaCategoriaCurso from './modules/categoriacurso/views/NuevaCategoriaCurso';
import EditarCategoriaCurso from './modules/categoriacurso/views/EditarCategoriaCurso';

import TipoCapacitador from './modules/tipocapacitador/views/TipoCapacitador';
import NuevaTipoCapacitador from './modules/tipocapacitador/views/NuevaTipoCapacitador';
import EditarTipoCapacitador from './modules/tipocapacitador/views/EditarTipoCapacitador';

import Curso from './modules/curso/views/Curso';
import NuevaCurso from './modules/curso/views/NuevaCurso';
import EditarCurso from './modules/curso/views/EditarCurso';

import Capacitador from './modules/capacitador/views/Capacitador';
import NuevaCapacitador from './modules/capacitador/views/NuevaCapacitador';
import EditarCapacitador from './modules/capacitador/views/EditarCapacitador';

import EventoCapacitacion from './modules/evento_capacitacion/views/EventoCapacitacion';
import NuevoEventoCapacitacion from './modules/evento_capacitacion/views/NuevoEventoCapacitacion';
import EditarEventoCapacitacion from './modules/evento_capacitacion/views/EditarEventoCapacitacion';

import Cabecera from './modules/cabecera/views/Cabecera';
import EditarCabecera from './modules/cabecera/views/EditarCabecera';
import NuevaCabecera from './modules/cabecera/views/NuevaCabecera';

const CombinedProviders = ({ children }) => (
  <MenuProvider>
    <PacienteProvider>
      {children}
    </PacienteProvider>
  </MenuProvider>
);



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CombinedProviders>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route 
                path="/fcc-menu-principal" 
                element={<PrivateRoute allowedRoles={['admin', 'personal_salud']}><MenuPrincipal /></PrivateRoute>}/>

            <Route 
              path="/fcc-pacientes" 
              element={<PrivateRoute element={Paciente} allowedRoles={['admin', 'doctor',  'personal_salud']} />} 
            />
            <Route 
              path="/fcc-pacientes/:id" 
              element={<PrivateRoute element={DetallePaciente} allowedRoles={['admin', 'doctor',  'personal_salud']} />} 
            />
            <Route 
              path="/fcc-personal-salud" 
              element={<PrivateRoute element={PersonalSalud} allowedRoles={['admin'] } />} 
            /> 
            <Route 
              path="/fcc-personal-salud/:id" 
              element={<PrivateRoute element={DetallePersonalSalud} allowedRoles={['admin',  'personal_salud']} />} 
            />
            <Route 
              path="/fcc-atencion" 
              element={<PrivateRoute element={Atencion} allowedRoles={['admin', 'doctor',  'personal_salud']} />} 
            />
            <Route 
              path="/fcc-atencion/nueva-atencion" 
              element={<PrivateRoute element={NuevaAtencionMedica} allowedRoles={['admin', 'doctor',  'personal_salud']} />} 
            />
            <Route 
              path="/fcc-configuracion" 
              element={<PrivateRoute element={Configuracion} allowedRoles={['admin', 'personal_salud']} />} 
            />
            <Route 
              path="/fcc-usuarios" 
              element={<PrivateRoute element={Usuarios} allowedRoles={['admin']} />} 
            />
            <Route 
              path="/fcc-historias-clinicas" 
              element={<PrivateRoute element={Historia} allowedRoles={['admin', 'doctor', 'personal_salud']} />} 
            />
            <Route 
              path="/fcc-terapias" 
              element={<PrivateRoute element={Terapia} allowedRoles={['admin', 'doctor', 'personal_salud']} />} 
            />
            <Route 
              path="/nueva-terapia/:id" 
              element={<PrivateRoute element={NuevaTerapia} allowedRoles={['admin', 'doctor', 'personal_salud']} />} 
            />
            <Route 
              path="/accessdenied"
              element={<AccessDenied />}
            />
            <Route 
              path="/provincia"
              element={<CrearProvincia />}
            />
            <Route 
              path="/ver_provincias"
              element={<VerProvincia />}
            />
            <Route 
              path="/crear_persona"
              element={<CrearPersona />}
            />
	          <Route 
              path="/tipo_persona" 
              element={<NuevoTipoPersona/>} 
            />
            <Route 
              path="/fcc-capacitaciones" 
              element={
                <PrivateRoute allowedRoles={['admin', 'doctor', 'personal_salud']}>
                  <Capacitaciones />
                </PrivateRoute>
              }
            />
            <Route 
              path="/fcc-capacitaciones/nueva" 
              element={
                <PrivateRoute allowedRoles={['admin', 'doctor', 'personal_salud']}>
                  <NuevaCapacitacion />
                </PrivateRoute>
              }
            />
            <Route
              path="/fcc-capacitaciones/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin', 'doctor', 'personal_salud']}>
                  <EditarCapacitacion />
                </PrivateRoute>
              }
            />
            <Route 
              path="/fcc-categoriacurso" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <CategoriaCurso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-categoriacurso/nueva" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevaCategoriaCurso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-categoriacurso/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarCategoriaCurso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-tipocapacitador" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <TipoCapacitador />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-tipocapacitador/nuevo" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevaTipoCapacitador />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-tipocapacitador/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarTipoCapacitador />
                </PrivateRoute>
              }
            />


            <Route 
              path="/fcc-curso" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Curso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-curso/nuevo" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevaCurso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-curso/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarCurso />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-capacitador" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Capacitador />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-capacitador/nuevo" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevaCapacitador />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-capacitador/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarCapacitador />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-evento_capacitacion" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EventoCapacitacion />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-evento_capacitacion/nuevo" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevoEventoCapacitacion />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-evento_capacitacion/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarEventoCapacitacion />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-cabecera" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Cabecera />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-cabecera/nuevo" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <NuevaCabecera />
                </PrivateRoute>
              }
            />

            <Route 
              path="/fcc-cabecera/editar/:id"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <EditarCabecera />
                </PrivateRoute>
              }
            />


            <Route path="/perfil" element={<PrivateRoute element={Perfil} allowedRoles={['admin', 'doctor', 'personal_salud']} />} />
            <Route path="/configuracion" element={<PrivateRoute element={Configuracion} allowedRoles={['admin', 'doctor', 'personal_salud']} />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          </CombinedProviders>
      </BrowserRouter>
    </div>
  );
}

export default App;
