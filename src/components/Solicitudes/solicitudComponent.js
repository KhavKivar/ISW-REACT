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


class SolicitudComponent extends React.Component {
    constructor() {

        super();
        this.state = {
            solicitudes: []
        };

    }



    componentDidMount() {

        axios.get('https://lilservice.herokuapp.com/solicitudes')
            .then(res => {
                const solicitudes_f = res.data;
                this.setState({ solicitudes: solicitudes_f });
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
                                        Solicitudes de atención
                                    </Typography>
                                </Box>
                                <Box ml={5} mr={5}>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Id</StyledTableCell>
                                                    <StyledTableCell align="right">Procedimiento</StyledTableCell>
                                                    <StyledTableCell align="right">Lugar</StyledTableCell>
                                                    <StyledTableCell align="right">Fecha</StyledTableCell>
                                                    <StyledTableCell align="right">Detalles</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {
                                                    this.state.solicitudes.map(
                                                        (solicitud) =>
                                                            <StyledTableRow key={solicitud.id}>
                                                                <StyledTableCell component="th" scope="row">{solicitud.id}</StyledTableCell>
                                                                <StyledTableCell align="right">{solicitud.procedimiento}</StyledTableCell>
                                                                <StyledTableCell align="right">{solicitud.idRecurso}</StyledTableCell>
                                                                <StyledTableCell align="right">{solicitud.fecha.substring(0, 10)}</StyledTableCell>
                                                                <StyledTableCell align="right"><Button className="success" href={ "/detallesSolicitud/"+solicitud.id }  >ver más</Button></StyledTableCell>
                                                            </StyledTableRow>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                <Grid container>
                                    <Grid item xs={10}></Grid>
                                    <Grid item xs={2}>
                                        <Box mt={4} mb={3}>
                                            <Button href="/addSolicitud">Generar solicitud</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        );


    }

}
export default SolicitudComponent;
