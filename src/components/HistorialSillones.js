import sillonService from './services/SillonService';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class HistorialSillones extends React.Component{
    constructor(){

        super();
        this.state = {

            sillones:[]

        };
    }
    componentDidMount(){
        sillonService.viewDeleted()
        .then(res => {
          const sillon = res.data;
          this.setState({ sillones:sillon});
        })
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
           
                                    <StyledTableCell align="right">Id original</StyledTableCell>
                                    <StyledTableCell align="right">Numero de sillon</StyledTableCell>
                                    <StyledTableCell align="right">Motivo de Eliminacion</StyledTableCell>
                                    <StyledTableCell align="right">Fecha de Creacion</StyledTableCell>
                                    <StyledTableCell align="right">Fecha de Eliminacion</StyledTableCell>
                                </TableRow>
    
                                </TableHead>
                                <TableBody>
                               {
                                            this.state.sillones.map(sillon =>
                                                <StyledTableRow key= {sillon.id}>
    
    
                                            
                                                     <StyledTableCell align="right">{sillon.id_original_sillon}</StyledTableCell>
                                                     <StyledTableCell align="right">{sillon.numero_sillon}</StyledTableCell>
                                                     <StyledTableCell align="right">{sillon.motivo}</StyledTableCell>
                                                     <StyledTableCell align="right">{sillon.fecha_creacion}</StyledTableCell>
                                                     <StyledTableCell align="right">{sillon.fecha_eliminacion}</StyledTableCell>
                                                     
                                                     </StyledTableRow>
                                            )
                                            }
                                </TableBody>
                            </Table>
                            </TableContainer>
                        );
    
    
        }


}
export default HistorialSillones;