import React, {Component} from 'react';
import equipamientosService from '../services/equipamientos.service';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';



class EquipamientoTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            equipment: [],
            editDets: {},
            addDets: {},
            addModal: false,
            editModal: false
        };
        this.toogleAddModal = this.toogleAddModal.bind(this);
        this.toogleEditModal = this.toogleEditModal.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
    }


    addEquipment(e) {
        e.preventDefault();
        let data = {...this.state.addDets}
        let equipmentadding = equipamientosService.create(data)
        console.log(data)
        this.toogleAddModal()
    }

    handleAddChange(event){
        const target = event.target;
        this.setState(prevState => ({
            addDets: {
                ...prevState.addDets,
                 [target.id]: target.value}
        }));
    }

    toogleAddModal() {
        this.setState({addModal: !this.state.addModal})
    }    
    toogleEditModal() {
        this.setState({editModal: !this.state.editModal})
    }


    componentDidMount(){
        equipamientosService.getAll()
            .then(res => {
                const equipment = res.data;
                this.setState({equipment})
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
    

        return (
            <div>
                <Modal show={this.state.addModal} onHide={this.toogleAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Equipamiento</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.addEquipment}>
                        <Modal.Body>
                            <Form.Group controlId="id">
                                <Form.Label>Id Equipamiento</Form.Label>
                                <Form.Control  onChange={this.handleAddChange}/>
                            </Form.Group>
                            <Form.Group controlId="nombre">
                                <Form.Label>Nombre del equipamiento</Form.Label>
                                <Form.Control type="text" onChange={this.handleAddChange} />
                            </Form.Group>
                            <Form.Group controlId="descripcion">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control type="text" onChange={this.handleAddChange} />
                            </Form.Group>                           
                        </Modal.Body>
                        <Modal.Footer>
                            <Button color="secondary" variant="contained" onClick={this.toogleAddModal}>
                                Cancelar
                            </Button>
                            <Button color="primary" variant="contained" type="submit">
                                Agregar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Container fixed >
                    <Button size="large" onClick={this.toogleAddModal} color="primary" variant="contained">Crear Equipamiento</Button>
                </Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell align="right">Nombre</StyledTableCell>
                                <StyledTableCell align="right">Descripción</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.equipment.map(equipment =>
                                    <StyledTableRow key={equipment.id}>
                                        <StyledTableCell component="th" scope="row">{equipment.id}</StyledTableCell>
                                        <StyledTableCell align="right">{equipment.nombre}</StyledTableCell>
                                        <StyledTableCell align="right">{equipment.descripcion}</StyledTableCell>
                                    </StyledTableRow>)
                            }
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default EquipamientoTable;
