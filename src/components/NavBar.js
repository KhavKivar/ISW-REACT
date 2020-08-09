import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PeopleButton from '@material-ui/icons/PeopleAltSharp';

import Team from '@material-ui/icons/GroupWork';
import Sillon from '@material-ui/icons/EventSeat';

import { makeStyles } from '@material-ui/core/styles';

class NavBar extends React.Component{
 

render(){ 

  const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
     
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      
    },
    button:{
      marginRight:20
    }
  }));



  return (  
    <div className={classes.root} style = {{marginBottom:20}}>
      <AppBar position="sticky">

        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} 
          color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
            ISW-PROYECT
          </Typography>
          <Button  className={classes.Button} startIcon={<PeopleButton/>}
          
          
          href= "/personas"  color="inherit">Personas</Button>

          <Button   startIcon={<Team/>} className={classes.Button}  href= "/equipos" color="inherit">Equipos</Button>

          <Button    startIcon={<Sillon/>}  className={classes.Button}  href= "/sillones" color="inherit">Sillones</Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
}




export default NavBar;