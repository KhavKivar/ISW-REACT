import React from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {

            equipos:[],
            personas:[]

        };
    }
    

    componentDidMount(){

        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.setState({ equipos:persons});
        })
    }


    render(){
        const {equipos} = this.state;
        const StyledTableCell = withStyles((theme) => ({
            body: {
            fontSize: 14,
            },
        }))(TableCell);
    
        const StyledTableRow = withStyles((theme) => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          }))(TableRow);
    
          const classes = makeStyles({
            table: {
              minWidth: 700,
            },
          });


        return(

           
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Id Equipo</StyledTableCell>
                                <StyledTableCell align="right">Nombre Equipo</StyledTableCell>
                                <StyledTableCell align="right">Medico a cargo</StyledTableCell>
                                <StyledTableCell align="right">Integrantes </StyledTableCell>
                            </TableRow>

                            </TableHead>
                            <TableBody>
                           {
                                        this.state.equipos.map(

                                            user =>
                                            <StyledTableRow key= {user.idEquipo}>


                                                 <StyledTableCell component="th" scope="row">{user.idEquipo}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.nameEquipo}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.director}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.integrantes}</StyledTableCell>
 

                                                 </StyledTableRow>

                                        )
                                        }
                            </TableBody>
                        </Table>
                        </TableContainer>
                    );



    }
}

export default  EquipoComponent;