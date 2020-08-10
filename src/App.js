import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import UserComponet from './components/UserComponent';
import EquipoComponent from './components/EquipoComponent';
import Sillones from './components/SillonesComponent';
import SolicitudComponent from './components/solicitudComponent';
import ReservaComponent from './components/reservaComponent';
import SolicitudDetails from './components/solicitudDetails';

function App() {
  return (

    <Router>
      <div className="app">
        <NavBar></NavBar>

        <Switch className="pt-5">

          <Route path="/personas">
            <div>
            <UserComponet></UserComponet>
            </div>
          </Route> 

          <Route path="/equipos">
             <EquipoComponent></EquipoComponent>

          </Route>

          <Route path="/sillones">
            <div>
            <Sillones></Sillones>
            </div>
          </Route>

          <Route path="/solicitud">
             <SolicitudComponent>
             </SolicitudComponent>
          </Route>

          <Route exact path="/detallesSolicitud/:id">
             <SolicitudDetails>
             </SolicitudDetails>
          </Route>

          <Route path="/reservas">
             <ReservaComponent>
             </ReservaComponent>
          </Route>

        </Switch>
      </div>
    </Router>
   

  );
}

export default App;
