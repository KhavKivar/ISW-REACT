import React from 'react';
import axios from 'axios';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';

import EquipoRow from './EquipoRow';

import EquipoModal from './EquipoModal';



const clases = makeStyles({
  root: {
    fontSize:30
  },
});




class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            equipos:[],
            page:0,
            rowsPerPage:10
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

    handleChangePage = (event, newPage) => {
      this.setState({page:newPage});
    };


    handleChangeRowsPerPage = (event) => {
     
      this.setState({rowsPerPage : event.target.value, page:0});
    };
  
    

    render(){



        return(

<div>


        <EquipoModal updateEquipos ={this.updateEquipo}></EquipoModal>



        <div style = {{marginTop:20}}>         
          <TableContainer component={Paper}>
          <Table aria-label="collapsible table" >
            <TableHead >
              <TableRow >
                <TableCell />
                <TableCell>Id Equipo</TableCell>
                <TableCell align="right">Nombre Equipo</TableCell>
                <TableCell align="right">Medico a cargo</TableCell>
                <TableCell align="right">Integrantes</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.equipos.slice(this.state.page*this.state.rowsPerPage,
              this.state.page*this.state.rowsPerPage+this.state.rowsPerPage)
              .map((row) => (
                <EquipoRow key={row.idEquipo}
                 row={row} 
                 updateEquipos ={this.updateEquipo} 
                 equipos = {this.state.equipos}/>

              ))
              }
            </TableBody>
          </Table>

        </TableContainer>

        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={this.state.equipos.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        
      />

        </div>

        </div>
      );
      }
           

}

export default  EquipoComponent;