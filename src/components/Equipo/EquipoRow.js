import React from 'react';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import DeleteIcon from '@material-ui/icons/Delete';

  import EditIcon from '@material-ui/icons/Edit';
import EquipoModalEdit from './EquipoModalEdit'

class EquipoRow extends React.Component{
    constructor(){
        super();
        this.state = {
            open:   false,
            modal: false,
            openv:false

        } 

        


    }
    abrirocerrar(){
      this.state.setState({modal: this.state.modal});


    }

  



    removeEquipo(e){

     
      axios.delete('https://isw-nhr.herokuapp.com/api/equipos/delete/'+e.toString())
      .then(res => {
        const response = res.data;
       
        if(response === "Ok"){
          let equipos = this.props.equipos;
         var  eq = [];
          for(const element of equipos){
            if(element.idEquipo == e){
              continue;

            }
            eq.push(element);
          }
          
        }
        this.props.updateEquipos(eq);
        
      });
      


    }


    render(){
        const { row } = this.props;
       

        const classes = makeStyles({
          root: {
            '& > *': {
              borderBottom: 'unset',
            },
          },
          iconos:{
            cursor:'pointer'
          },

        });

        return (
            <React.Fragment>
              <TableRow className={classes.root}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => this.setState({open: !this.state.open})}>
                    {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.idEquipo}
                </TableCell>
                <TableCell align="right">{row.nameEquipo}</TableCell>
                <TableCell align="right">{row.director}</TableCell>
                <TableCell align="right">{row.integrantes}</TableCell>
                <TableCell align="right">

               <EquipoModalEdit  updateValue = {this.props.updateEquipos}
                data = {this.props.equipos} id = {row.idEquipo} >



               </EquipoModalEdit>
            
                  

                  
                <IconButton aria-label="delete" onClick={() => { this.removeEquipo(row.idEquipo)}} >
                    <DeleteIcon />
                  </IconButton>
                          


                </TableCell>


        

              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        Personas
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Identificador</TableCell>
                            <TableCell align="right">Especializacion</TableCell>
                            <TableCell align="right">Estado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.personas.map((x) => (
                            <TableRow key={x.idPersona}>
                              <TableCell component="th" scope="row">
                                {x.idPersona}
                              </TableCell>
                              <TableCell>{x.nombre}</TableCell>
                              <TableCell align="right">{x.apellido}</TableCell>
                              <TableCell align="right">  {x.identificador}
                              </TableCell>
                              <TableCell align="right">  {x.especializacion}
                              </TableCell>
                              <TableCell align="right">  {x.estado}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );

         
    }




}

export default EquipoRow;