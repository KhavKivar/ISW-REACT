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


class UserComponet extends React.Component{
    constructor(){

        super();
        this.state = {
            users:[]
        };

    }
    componentDidMount(){

        axios.get('https://isw-nhr.herokuapp.com/api/personas/all')
        .then(res => {
          const persons = res.data;
          this.setState({ users:persons });
        });



    }
    render(){

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
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="right">Nombre</StyledTableCell>
                                <StyledTableCell align="right">Apellido</StyledTableCell>
                                <StyledTableCell align="right">Identificador</StyledTableCell>
                                <StyledTableCell align="right">Especializacion</StyledTableCell>
                                <StyledTableCell align="right">Estado</StyledTableCell>
                            </TableRow>

                            </TableHead>
                            <TableBody>
                           {
                                        this.state.users.map(

                                            user =>
                                            <StyledTableRow key= {user.idPersona}>


                                                 <StyledTableCell component="th" scope="row">{user.idPersona}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.nombre}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.apellido}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.identificador}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.especializacion}</StyledTableCell>
                                                 <StyledTableCell align="right">{user.estado}</StyledTableCell>


                                                 </StyledTableRow>

                                        )
                                        }
                            </TableBody>
                        </Table>
                        </TableContainer>
                    );


    }

}
export default  UserComponet;
