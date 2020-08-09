import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserComponet from './components/Equipo/UserComponent';




import EquipoComponent from './components/Equipo/EquipoComponent';
import Sillones from './components/SillonesComponent';
import HistorialSillones from './components/HistorialSillones'

import Container from '@material-ui/core/Container';


function App() {
  return (

    <Router>
      <div className="app">
        <NavBar></NavBar>

        <Switch>

          <Route path="/personas">
          <Container>
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
        </Switch>
      </div>
    </Router>
   

  );
}

export default App;
