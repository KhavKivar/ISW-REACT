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


class EquipamientoTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0,
            equipment: [],
        }
    }

    componentDidMount(){
        //axios.get(`http://localhost:8080/api/equipamiento`)
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
    

        return(
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
        )



        /*
        return(
            <div>
                <h1>
                    All Equipments. 
                </h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.equipment.map(equipment =>
                                <tr key={equipment.id}>
                                    <td>{equipment.id}</td>
                                    <td>{equipment.nombre}</td>
                                    <td>{equipment.descripcion}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        );
        */
    }
}
export default EquipamientoTable;
