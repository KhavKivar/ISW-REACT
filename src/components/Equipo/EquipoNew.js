import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import Widget from './Widget'
import 'react-dual-listbox/lib/react-dual-listbox.css';








class EquipoNew extends React.Component{
constructor(props) {
    super(props);

    this.state = {nameEquipo: '',
                  director:'',
                  personas:[],
                  px:[],
                  idEquipo:-1
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
  
    
    if(this.state.px.length>0){

      axios.put('https://isw-nhr.herokuapp.com/api/equipos/edit/'+this.props.data.idEquipo, 
      { nameEquipo:event.target.nameEquipo.value,
      director :event.target.director.value,
      ids :idl} )
      .then(res => {      
        this.props.onCloseModal();
        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.props.updateValue(persons);
        })
      })  
    }

    else
    {

    
      axios.post('https://isw-nhr.herokuapp.com/api/equipos/new', { nameEquipo:event.target.nameEquipo.value,
      director :event.target.director.value,
      ids :idl} )
      .then(res => {      
        this.props.onCloseModal();

        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.props.updateValue(persons);

        })
        

      })  

  }
  
  
  }



  componentDidMount(){
   

    if(typeof this.props.data !== 'undefined'){
      this.setState({px:this.props.data.personas});
    }


    if(this.props.data != null){

      
    this.setState({nameEquipo:this.props.data.nameEquipo});
    this.setState({director:this.props.data.director});

  } 

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
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));
  

    
    return (
      
      <form  onSubmit = {this.handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div style = {{marginTop:30 }}>
                <TextField value={this.state.nameEquipo || ''} 
                onChange={this.handleChange}

                fullWidth = {true} name = "nameEquipo"
                 id="nameEquipo" label="Nombre del equipo" variant="outlined"
                 inputProps={{
                  style: {
                    padding: 3
                  }
               }}
           
                 type ="text"  
                 />   
            </div>
          <div style ={{marginTop:20}}>
           <TextField value={this.state.director || ''}  onChange={this.handleChange}
            fullWidth = {true} id="director" label="Director" variant="outlined"  
        
            name= "director"
                inputProps={{
                  style: {
                    padding: 3
                  }
               }}
           />  
          </div>
          
          <div style = {{ marginTop:20,marginInlineStart:-15}}>         
            
             <Widget personas = {this.state.personas}

              personasedit = {this.state.px }>

                
              </Widget>
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