import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserComponet from './components/Equipo/UserComponent';
import Container from '@material-ui/core/Container';

        

import EquipoComponent from './components/Equipo/EquipoComponent';
import Sillones from './components/SillonesComponent';
import HistorialSillones from './components/HistorialSillones'
import SillonesEliminados from './components/SillonesEliminadosComponent'


import SolicitudComponent from './components/solicitudComponent';
import ReservaComponent from './components/reservaComponent';
import SolicitudDetails from './components/solicitudDetails';

import Equipamiento from './components/Equipamiento'



function App() {
  return (

   
      <div className="app" >

     
        <NavBar  ></NavBar>
      
        
       
        <Router>
       
        <Switch className="pt-5">

          <Route path="/personas">
          <Container >
            <UserComponet></UserComponet>
            </Container>
          </Route> 

          
          
          <Route path="/equipos">
          <Container>
             <EquipoComponent></EquipoComponent>

             </Container>
          </Route>

          <Route path="/sillones">
            <div>
            <Sillones></Sillones>
            </div>
          </Route> 
          <Route path="/silloneseliminados">
            <div>
            <HistorialSillones></HistorialSillones>
            </div>
          </Route> 
          <Route path="/silloneseliminadoslist">
            <div>
            <SillonesEliminados></SillonesEliminados>
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

          <Route path="/equipamiento">
            <div>
              <Container>
                <Equipamiento/>
              </Container>
            </div>
          </Route>
        </Switch>
         
        </Router>
        </div>
    

   
   

  );
}

export default App;
