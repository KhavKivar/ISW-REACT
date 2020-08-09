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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
class Sillones extends React.Component{
    constructor(props) {
        super(props);
        this.state = {sillones:[], editDetails: {}, addDetails: {}, addModal: false, editModal:false};
        this.delete = this.delete.bind(this);
        this.toogleAddModal = this.toogleAddModal.bind(this);
        this.toogleEditModal = this.toogleEditModal.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.loadSillonDetails = this.loadSillonDetails.bind(this);
        this.addSillon = this.addSillon.bind(this);
        this.editSillon = this.editSillon.bind(this);

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

    loadSillonDetails(e) {
        let id = e.target.getAttribute('data')
        if (id == undefined)
            id = e.target.parentNode.getAttribute('data')
        console.log(id)
        let ss = sillonService.viewSillon(id)
        console.log(ss)
        ss.then(res => {
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
    
    componentDidMount() {
        this.getsillones()
    }
    
    addSillon(e) {
        e.preventDefault();
        let data = {...this.state.addDetails}
        data['activo'] = true
        console.log(data)
        let ss = sillonService.createSillon(data)
        console.log(ss)
        this.toogleAddModal()
    }
    editSillon(e) {
        e.preventDefault();
        let data = {...this.state.editDetails}
        delete data["id"]
        delete data["fecha_creacion"]
        delete data["fecha_update"]
        delete data["fecha_retirado"]
        console.log(data)
        let ss = sillonService.editSillon(this.state.editDetails.id, data)
        ss.then(res => {
            let data = res.data
            
        //     let newState = this.state.sillones.map(sillon => {
        //         console.log(sillon.id, this.state.editDetails.id)
        //         if (sillon.id === this.state.editDetails.id) {
        //             console.log("cambio")
        //             return <>
        //                 <tr key={data.id}>
        //                     <th>{data.id}</th>
        //                     <td>{data.numero_sillon}</td>
        //                     <td>{data.numero_sala}</td>
        //                     <td>{data.fecha_update}</td>
        //                     <td>{data.fecha_creacion}</td>
        //                     <td>
        //                         <Button variant="contained" color="inherit" onClick={this.loadSillonDetails} data={sillon.id}>Editar</Button>
        //                     </td>
        //                     <td>
        //                         <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={this.delete} data={sillon.id}>Eliminar</Button>
        //                     </td>
                            
        //                 </tr>)
        //             </>
        //         }
        //         return sillon
        //     })
        //     this.setState({sillones: newState})
        })
        this.toogleEditModal()
    }
   
    delete(e) {
        let id = e.target.getAttribute('data')
        if (id == undefined)
            id = e.target.parentNode.getAttribute('data')
        var data = {"data": {"motivo": "Sin definir"}}
        var motivo = prompt("Ingrese Motivo de deshabilitación", "Sin definir")
        if (motivo === null) return
        data.data.motivo = motivo
        
        let deletePromise = sillonService.deleteSillon(id, data)
        deletePromise.then(res => {
            alert("Sillon deshabilitado")
            this.refreshPage()
        })
        
        console.log(deletePromise)
    }
    getsillones() {
        sillonService.viewAll().then(res => {
            this.setState({ sillones: res.data.map(sillon => {
                    let creationDate = new Date(sillon.fecha_creacion).toLocaleString('es-CL')
                    let updateDate
                    if (sillon.fecha_update)
                        updateDate = new Date(sillon.fecha_update).toLocaleString('es-CL')
                    console.log(creationDate, updateDate)
                return  <>
                    <TableRow key={sillon.id}>
                        <TableCell component="th" scope="row">{sillon.id}</TableCell>
                        <TableCell>{sillon.numero_sillon}</TableCell>
                        <TableCell>{sillon.numero_sala}</TableCell>
                        <TableCell>{updateDate}</TableCell>
                        <TableCell>{creationDate}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="inherit" onClick={this.loadSillonDetails} startIcon={<EditIcon />} data={sillon.id}>Editar</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" color="secondary" onClick={this.delete} startIcon={<DeleteIcon />} data={sillon.id}>Eliminar</Button>
                        </TableCell>
                    </TableRow>
                </>
                    })
                
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
        <Modal show={this.state.addModal} onHide={this.toogleAddModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Sillón</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.addSillon}>
                <Modal.Body>
                    <Form.Group controlId="numero_sillon">
                        <Form.Label>Número sillón</Form.Label>
                        <Form.Control  placeholder="Ingresa Número sillón" onChange={this.handleAddChange}/>
                    </Form.Group>
                    <Form.Group controlId="numero_sala">
                        <Form.Label>Sala del sillón</Form.Label>
                        <Form.Control type="number" placeholder="Ingresa Sala del sillón" onChange={this.handleAddChange} />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button color="secondary" variant="contained" onClick={this.toogleAddModal}>
                    Cancelar
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                    Crear sillón
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal> 
        <Modal show={this.state.editModal} onHide={this.toogleEditModal}>
        <Modal.Header closeButton>
        <Modal.Title>Editar Sillón</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.editSillon} >
        <Modal.Body>
        <Form.Group controlId="numero_sillon">
        <Form.Label>Número sillón</Form.Label>
        <Form.Control  value={this.state.editDetails.numero_sillon} placeholder="Ingresa Número sillón" onChange={this.handleEditChange} />
        </Form.Group>
        <Form.Group controlId="numero_sala">
        <Form.Label>Sala del sillón</Form.Label>
        <Form.Control type="number" value={this.state.editDetails.numero_sala} placeholder="Ingresa Sala del sillón" onChange={this.handleEditChange} />
        </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
        <Button color="secondary" variant="contained" onClick={this.toogleEditModal}>
        Cancelar
        </Button>
        <Button color="primary" ariant="contained" type="submit">
        Guardar cambios
        </Button>
        </Modal.Footer>
        </Form>
        </Modal> 
        <br></br>
        <Container fixed >
        <Button startIcon={<AddIcon />} size="large" onClick={this.toogleAddModal} color="primary" variant="contained">Crear Sillon</Button>
        <br></br>
        <Button size="large" href="/silloneseliminadoslist" color="inherit" variant="contained">Ver Sillones Eliminados</Button>
        <Button size="large" href="/silloneseliminados" color="inherit" variant="contained">Historial de Sillones Borrados</Button>
        </Container>
        <br></br>
        <Container>
        <TableContainer component={Paper}>
            <Table  align="left"aria-label="customized table">
                <TableHead>
                    <TableRow>
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
                    {this.state.sillones}
                </TableBody>
            </Table>
        </TableContainer>
        </Container>
        </>
    }
}

export default Sillones;
