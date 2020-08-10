import sillonService from '../services/SillonService.js';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab'


import UndoIcon from '@material-ui/icons/Undo';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class SillonesEliminados extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones:[], deleteSnack: false};
        this.renderTableContents = this.renderTableContents.bind(this);
        this.devolver = this.devolver.bind(this)
        this.hideSnack = this.hideSnack.bind(this)

    }
    
    refreshPage() {
        window.location.reload(false);
    }
    




    componentDidMount() {
        this.getsillones()
    }
    
    hideSnack() {
        this.setState({deleteSnack: false})
    }
   
    devolver(e) {
        let id = e.target.getAttribute('data')
        if (id == undefined)
            id = e.target.parentNode.getAttribute('data')
        let revivePromise = sillonService.reviveDeleted(id)
        revivePromise.then(res => {
            this.setState({deleteSnack: true})
            let del = this.state.sillones.filter(sillon => {
                return parseInt(id) !== sillon.id})
            this.setState({'sillones': del})        })
        
        console.log(revivePromise)
    }
    getsillones() {
        sillonService.viewBorrados().then(res => {
            this.setState({ sillones: res.data
            })
        })
    }

    renderTableContents() {
        if (this.state.sillones) {
            return this.state.sillones.map(sillon => {
                let creationDate = new Date(sillon.fecha_creacion).toLocaleString('es-CL')
                let updateDate = new Date(sillon.fecha_retirado).toLocaleString('es-CL')
                return <>
                    <tr key={sillon.id}>
                        <th>{sillon.id}</th>
                        <td>{sillon.numero_sillon}</td>
                        <td>{sillon.numero_sala}</td>
                        <td>{updateDate}</td>
                        <td>{creationDate}</td>
                        <td>
                <Button variant="contained" color="primary" onClick={this.devolver} startIcon={<UndoIcon />} data={sillon.id}>Devolver Sillon</Button>
                        </td>
                    </tr>
                </>
            })   
        }
    }

    render() {
        
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
        <br></br>
        <Container>
        <Button size="large" href="/sillones" color="inherit" variant="contained">Ver Sillones Disponibles</Button>
        <Button size="large" href="/silloneseliminados" color="inherit" variant="contained">Historial de Sillones Borrados</Button>
        </Container>
        <br></br>
        <Container fixed>
        <TableContainer component={Paper}>
        <Table  align="left"aria-label="customized table" >
        <TableHead>
        <TableRow class="highlight">
        <StyledTableCell>Id</StyledTableCell>
        <StyledTableCell  >Número Sillón</StyledTableCell>
        <StyledTableCell>Número Sala</StyledTableCell>
        <StyledTableCell >Fecha de Eliminado</StyledTableCell>
        <StyledTableCell >Fecha de creación</StyledTableCell>
        <StyledTableCell ></StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody class="centered">
        {this.renderTableContents()}
    </TableBody>
    </Table>
</TableContainer>
</Container>
<Snackbar
            open={this.state.deleteSnack}
            autoHideDuration={3000}
            onClose={this.hideSnack}
            >
                <Alert severity="success">¡Sillón habilitado con exito!"</Alert>
            </Snackbar>
        
      
        </>
    }
}

export default SillonesEliminados;