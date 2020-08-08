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
import EquipoNew from './components/EquipoNew';
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

          

          
        </Switch>
      </div>
    </Router>
   

  );
}

export default App;
