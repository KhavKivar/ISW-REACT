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
import { Container } from '@material-ui/core';
import { Button } from '@material-ui/core';
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
        sillonService.viewDeleted().then(res=> {
          
          this.setState({sillones: res.data.map( sillon=> {
            let creationDate = new Date(sillon.fecha_creacion).toLocaleString('es-CL')
            let updateDate
            if (sillon.fecha_eliminacion)
              updateDate = new Date(sillon.fecha_eliminacion).toLocaleString('es-CL')

            return <>
              <tr key={sillon.id}>
                <td>{sillon.id_original_sillon}</td>
                <td>{sillon.numero_sillon}</td>
                <td>{sillon.motivo}</td>
                <td>{creationDate}</td>
                <td>{updateDate}</td>
              </tr>
            </>
          })
          })
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
    
            return <>
            <Container>
            <Container fixed >
            <br></br>
        <Button size="large" href="/sillones" color="inherit" variant="contained">Ver Sillones Disponibles</Button>
        <Button size="large" href="/silloneseliminadoslist" color="inherit" variant="contained">Ver Sillones Eliminados</Button>
        <br></br>
        
        </Container>
              <TableContainer component={Paper}>
              <Table  align="left"aria-label="customized table" >
              <TableHead>
              <TableRow class="highlight">
              <StyledTableCell>Id Original</StyledTableCell>
              <StyledTableCell  >Número Sillón</StyledTableCell>
              <StyledTableCell>Motivo</StyledTableCell>
              <StyledTableCell >Fecha De Creacion</StyledTableCell>
              <StyledTableCell >Fecha De Eliminacion</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody class="centered">
              {this.state.sillones}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
                        </>
    
    
        }


}
export default HistorialSillones;