import sillonService from '../services/SillonService.js';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TablePagination from '@material-ui/core/TablePagination';


//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar} from '@material-ui/core';
import {Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon} from '@material-ui/icons';
import { Alert } from '@material-ui/lab'
import AddSillonModal from './sillonesAdd'
import EditSillonModal from './sillonesEdit'



class Sillones extends React.Component{
    constructor(props) {
        super(props);
     
        this.state = {sillones:[], editId: 0 , addModal: false, editModal:false, deleteSnack: false,
            page:0,rowsPerPage:10 
        };
        // this.delete = this.delete.bind(this);
        this.toogleAddModal = this.toogleAddModal.bind(this);
        this.toogleEditModal = this.toogleEditModal.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        // this.loadSillonDetails = this.loadSillonDetails.bind(this);
        this.editTable = this.editTable.bind(this);
        this.hideSnack = this.hideSnack.bind(this)
        this.renderTableContents = this.renderTableContents.bind(this);

    }
    
    refreshPage() {
        window.location.reload(false);
    }
    
    handleAddChange(event){
        const target = event.target;
        console.log(target.value)
        this.setState(prevState => ({
            addDetails: {
                ...prevState.addDetails,
                 [target.id]: target.value}
        }));
    }
    handleEditChange(event) {
        const target = event.target;
        console.log(target.value)
        let edition = this.state.editDetails
        // edition[target.id] = target.value
        // this.setState({editDetails: edition})
    }

    loadSillonDetails(id, e) {
        // console.log(id,e)
        let ss = sillonService.viewSillon(id)
        ss.then(res => {
            console.log(res.data)
            this.setState({editDetails: res.data})
        })
        this.toogleEditModal()
    }
    toogleAddModal() {
        this.setState({addModal: !this.state.addModal})
    }    
    toogleEditModal() {
        this.setState({editModal: !this.state.editModal})
    }
    invokeEditModal(id) {
        this.setState({editId: id})
        console.log(this.state.editId)
        this.toogleEditModal()
    }
    
    componentDidMount() {
        this.getsillones()
    }

    hideSnack() {
        this.setState({deleteSnack: false})
    }
    
    editTable(newSillon) {
        let changed = false
        let newState = this.state.sillones.map(sillon => {
            if (sillon.id === newSillon) {
                changed = !changed
                return newSillon
            }
            return sillon
        })
        if (!changed)
            newState.unshift(newSillon)
        this.setState({sillones: newState})
    }
   
    delete(id, e) {

        var data = {"data": {"motivo": "Sin definir"}}
        var motivo = prompt("Ingrese Motivo de deshabilitación", "Sin definir")
        if (motivo === null) return
        data.data.motivo = motivo
        
        let deletePromise = sillonService.deleteSillon(id, data)
        deletePromise.then(() => {
            this.setState({deleteSnack: true})
            let del = this.state.sillones.filter(sillon => {
                return parseInt(id) !== sillon.id})
            this.setState({'sillones': del})
        })
        
    }
    getsillones() {
        console.log('aqui')
        sillonService.viewAll().then(res => {
            this.setState({ sillones: res.data})
        })
    }

    renderTableContents() {
        if (this.state.sillones) {
            return this.state.sillones.map(sillon => {
                let creationDate = new Date(sillon.fecha_creacion).toLocaleString('es-CL')
                let updateDate
                if (sillon.fecha_update)
                    updateDate = new Date(sillon.fecha_update).toLocaleString('es-CL')
                return  <>
                
                    <TableRow key={sillon.id}>
                        <TableCell component="th" scope="row">{sillon.id}</TableCell>
                        <TableCell>{sillon.numero_sillon}</TableCell>
                        <TableCell>{sillon.numero_sala}</TableCell>
                        <TableCell>{updateDate}</TableCell>
                        <TableCell>{creationDate}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="inherit" onClick={this.invokeEditModal.bind(this, sillon.id)} startIcon={<EditIcon />}>Editar</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={this.delete.bind(this, sillon.id)} startIcon={<DeleteIcon />}>Eliminar</Button>
                        </TableCell>
                    </TableRow>



                </>
            })
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({page:newPage});
      };
  
  
      handleChangeRowsPerPage = (event) => {
       
        this.setState({rowsPerPage : event.target.value, page:0});
      };
    

    render() {
        
    const StyledTableCell = withStyles((theme) => ({
        body: {
        fontSize: 14,
        },
    }))(TableCell);

    // const StyledTableRow = withStyles((theme) => ({
    //     root: {
    //       '&:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.action.hover,
    //       },
    //     },
    //   }))(TableRow);

    //   const classes = makeStyles({
    //     table: {
    //       minWidth: 700,
    //     },
    //   });

        return <> 
        <AddSillonModal show={this.state.addModal} toogle={this.toogleAddModal} updateTable={this.editTable}></AddSillonModal>
        <EditSillonModal sillonId={this.state.editId} show={this.state.editModal} toogle={this.toogleEditModal} updateTable={this.editTable}></EditSillonModal>
        <br></br>
        <Container fixed >
        <Button startIcon={<AddIcon />} size="large" onClick={this.toogleAddModal} color="primary" variant="contained">Crear Sillon</Button>
        <br></br>
        <br></br>
        <Button size="large" href="/silloneseliminadoslist" color="inherit" variant="contained">Ver Sillones Eliminados</Button>
        <Button size="large" href="/silloneseliminados" color="inherit" variant="contained">Historial de Sillones Borrados</Button>
        </Container>
        <br></br>
        <Container >
        <TableContainer style={{maxHeight:"70vh", overflow:"auto"}} component={Paper}>
            <Table stickyHeader align="left"aria-label="customized table">
                <TableHead>
                    <TableRow >
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell >Número Sillón</StyledTableCell>
                        <StyledTableCell>Número Sala</StyledTableCell>
                        <StyledTableCell>Ultima actualizacion</StyledTableCell>
                        <StyledTableCell>Fecha de creación</StyledTableCell>
                        <StyledTableCell>Acciones</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
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
                <Alert severity="success">¡Sillón eliminado con exito!"</Alert>
            </Snackbar>
        </>
    }
}

export default Sillones;
