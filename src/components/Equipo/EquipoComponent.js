import React from 'react';
import axios from 'axios';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import EquipoRow from './EquipoRow';

import EquipoModal from './EquipoModal';

class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            equipos:[]
        };
        this.updateEquipo = this.updateEquipo;
    }
    updateEquipo = (text) =>{ this.setState({equipos:text})};

    componentDidMount(){
        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.setState({ equipos:persons});
            

        })
    }

  

    render(){
      


        return(

<div>


        <EquipoModal updateEquipos ={this.updateEquipo}></EquipoModal>



        <div style = {{marginTop:20}}>         
          <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id Equipo</TableCell>
                <TableCell align="right">Nombre Equipo</TableCell>
                <TableCell align="right">Medico a cargo</TableCell>
                <TableCell align="right">Integrantes</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.equipos.map((row) => (
                <EquipoRow key={row.idEquipo} row={row} updateEquipos ={this.updateEquipo} equipos = {this.state.equipos}/>

              ))
              }
            </TableBody>
          </Table>

        </TableContainer>
        </div>

        </div>
      );
      }
           

}

export default  EquipoComponent;