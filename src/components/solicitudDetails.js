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


class SolicitudDetails extends React.Component {
    constructor() {

        super();
        this.state = {
            solicitudes: []
        };

    }



    componentDidMount() {
        console.log(this.props)
        axios.get('https://lilservice.herokuapp.com/solicitudes/1')
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
                                        {"Solicitud " + this.state.solicitudes.id}
                                    </Typography>
                                </Box>
                                <Box ml={5} mr={5}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Box mb={4}>
                                                <Typography variant="h5">Procedimiento</Typography>
                                                <Typography variant="h6">{this.state.solicitudes.procedimiento}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">
                                                {
                                                    this.state.solicitudes.procedimiento == "Quimio" ? "Sillón" : "Pabellón"
                                                }
                                            </Typography>
                                            <Typography variant="h6">{this.state.solicitudes.idRecurso}</Typography>
                                            </Box>
                                        </Grid>


                                        <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Equipo</Typography>
                                            <Typography variant="h6">{this.state.solicitudes.equipamiento}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Equipamiento</Typography>
                                            <Typography variant="h6">{this.state.solicitudes.equipamiento}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h5">Fecha de creación</Typography>
                                            <Typography variant="h6">{this.state.solicitudes.fecha}</Typography>
                                        </Grid>

                                    </Grid>
                                </Box>

                                <Grid container>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={2}>
                                        <Box mt={4} mb={3}>
                                            <Button>Editar solicitud</Button>

                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box mt={4} mb={3}>
                                            <Button>Aceptar solicitud</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box mt={4} mb={3}>
                                            <Button>Rechazar solicitud</Button>
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
export default SolicitudDetails;
