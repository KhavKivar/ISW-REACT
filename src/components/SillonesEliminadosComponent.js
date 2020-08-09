import sillonService from './services/SillonService';
import React from 'react';
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
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
class SillonesEliminados extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones:[], editDetails: {}, addDetails: {}, addModal: false, editModal:false};

    }
    
    refreshPage() {
        window.location.reload(false);
    }
    
    handleAddChange(event){
        const target = event.target;
        this.setState(prevState => ({
            addDetails: {
                ...prevState.addDetails,
                 [target.id]: target.value}
        }));
    }
    handleEditChange(event) {
        const target = event.target;
        console.log(this.state.editDetails)
        this.setState(prevState => ({
            editDetails: {
                ...prevState.editDetails,
                 [target.id]: target.value}
        }))
        console.log(this.state.editDetails)
    }


    toogleAddModal() {
        this.setState({addModal: !this.state.addModal})
    }    
    toogleEditModal() {
        this.setState({editModal: !this.state.editModal})
    }
    
    componentDidMount() {
        this.getsillones()
    }
    
 
   
    devolver(e) {
        let id = e.target.getAttribute('data')
        if (id == undefined)
            id = e.target.parentNode.getAttribute('data')
        let revivePromise = sillonService.reviveDeleted(id)
        revivePromise.then(res => {
            alert("Sillon habilitado")
            window.location.reload(false);
        })
        
        console.log(revivePromise)
    }
    getsillones() {
        sillonService.viewBorrados().then(res => {
            this.setState({ sillones: res.data.map(sillon =>
                <tr key={sillon.id}>
                <th>{sillon.id}</th>
                <td>{sillon.numero_sillon}</td>
                <td>{sillon.numero_sala}</td>
                <td>{sillon.fecha_retirado}</td>
                <td>{sillon.fecha_creacion}</td>
                <td>
                <Button variant="contained" color="secondary" onClick={this.devolver} data={sillon.id}>Devolver Sillon</Button>
                </td>
                
                </tr>)
            })
        })
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
        <Container>
        <Button size="large" href="/sillones" color="inherit" variant="contained">Ver Sillones Disponibles</Button>
        <Button size="large" href="/silloneseliminados" color="inherit" variant="contained">Historial de Sillones Borrados</Button>
        </Container>
        <Container fixed>
        <TableContainer component={Paper}>
        <Table  align="left"aria-label="customized table" ></Table>
        <TableHead>
        <TableRow class="highlight">
        <StyledTableCell>Id</StyledTableCell>
        <StyledTableCell  >Número Sillón</StyledTableCell>
        <StyledTableCell>Número Sala</StyledTableCell>
        <StyledTableCell >Fecha de Eliminado</StyledTableCell>
        <StyledTableCell >Fecha de creación</StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody class="centered">
        {this.state.sillones}
    </TableBody>
</TableContainer>
</Container>
            
        
      
        </>
    }
}

export default SillonesEliminados;