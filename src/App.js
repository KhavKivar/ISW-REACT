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
        </Switch>
      </div>
    </Router>
   

  );
}

export default App;
