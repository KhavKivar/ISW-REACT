import React from 'react';
import axios from 'axios';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { spacing } from '@material-ui/system';


import Grid from '@material-ui/core/Grid';


class ReservaComponent extends React.Component {
    constructor() {

        super();
        this.state = {
            reservas: []
        };

    }



    componentDidMount() {

        axios.get('https://lilservice.herokuapp.com/reservas')
            .then(res => {
                const reservas_f = res.data;
                console.log(res.data);
                this.setState({ reservas : reservas_f });
            });



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

        const theme = {
            spacing: 8,
        }


        return (
            <Box pt={2} mt={3}>
                <Grid container spacing={3} justify="center" pt={2}>
                    <Grid item xs={10}>
                        <Card >
                            <CardContent>
                                <Box mt={4} mb={5} ml={5}>
                                    <Typography gutterBottom variant="h4">
                                        Reservas
                                    </Typography>
                                </Box>
                                <Box ml={5} mr={5} mb={3}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Id</StyledTableCell>
                                                    <StyledTableCell align="right">Fecha inicio</StyledTableCell>
                                                    <StyledTableCell align="right">Fecha termino</StyledTableCell>
                                                    <StyledTableCell align="right">Detalles</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.reservas.map(
                                                        (reserva) =>
                                                            <StyledTableRow key={reserva.id}>
                                                                <StyledTableCell component="th" scope="row">{reserva.id}</StyledTableCell>
                                                                <StyledTableCell align="right">{reserva.idSolicitud["id"]}</StyledTableCell>
                                                                <StyledTableCell align="right">{reserva.fecha_inicio.substring(0, 10)}</StyledTableCell>
                                                                <StyledTableCell align="right"><Button className="success" href={ "/detallesReserva/"+reserva.id }  >ver más</Button></StyledTableCell>
                                                            </StyledTableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        );


    }

}
export default ReservaComponent;
