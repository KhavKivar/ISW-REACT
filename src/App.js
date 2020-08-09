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
import HistorialSillones from './components/HistorialSillones'
import SillonesEliminados from './components/SillonesEliminadosComponent'
function App() {
  return (

    <Router>
      <div className="app">
        <NavBar></NavBar>

        <Switch>

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
        </Switch>
      </div>
    </Router>
   

  );
}

export default App;
