import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import Widget from '../components/Widget'
import 'react-dual-listbox/lib/react-dual-listbox.css';








class EquipoNew extends React.Component{
constructor(props) {
    super(props);

    this.state = {nameEquipo: '',
                  director:'',
                  personas:[]
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleChange(event) {  
    const vv = event.target.value;
    this.setState({
        [event.target.name] :vv
    })
  }

  
  handleSubmit(event) {
    
    console.log(event.target.nameEquipo.value);
    console.log(event.target.director.value);
    var i;

    var idl=[];
    event.preventDefault();
    for(i = 0; i < document.getElementsByClassName("MuiList-root MuiList-dense MuiList-padding")[1].childElementCount-1;i++){
      let x = document.getElementsByClassName("MuiList-root MuiList-dense MuiList-padding")[1].children[i].innerText;
      for(const element of this.state.personas){
          if(element.nombre + " "+element.apellido === x){
            idl.push(element.identificador.toString());
          }
      }
    }
  

    axios.post('https://isw-nhr.herokuapp.com/api/equipos/new', { nameEquipo:event.target.nameEquipo.value,
    director :event.target.director.value,
    ids :idl} )
    .then(res => {
      console.log(res);
      console.log(res.data);
      document.getElementsByClassName("makeStyles-paper-1")[0].style.display = "none";

    })  
  
  
  
  
  }



  componentDidMount(){

    axios.get('https://isw-nhr.herokuapp.com/api/personas/all')
    .then(res => {
      const persons = res.data;
      this.setState({ personas:persons });
    });


}
  
  

  render() {
   const classes = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(10),
          width: '40ch',
        },
      },
    }));
  

    return (
     
      <form  onSubmit = {this.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div style = {{marginTop:30}}>
                <TextField fullWidth = {true} name = "nameEquipo"
                 id="nameEquipo" label="Nombre del equipo" variant="outlined" />   
            </div>
          <div style ={{marginTop:20}}>
           <TextField fullWidth = {true} id="director" label="Director" variant="outlined" />  
          </div>
          
          <div style = {{ marginTop:20,marginInlineStart:-15}}>         
            
             <Widget personas = {this.state.personas}></Widget>
          </div>

          <div style = {{marginTop:10}}>
             <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth = {true}
        className={classes.button}
        startIcon={<SaveIcon />
        }
        type = "submit"
       
      >
        Save
      </Button>
       
      
        </div>

      </form>


    );
  }
}
export default EquipoNew;