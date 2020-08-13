import React, { useEffect } from 'react';
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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { spacing } from '@material-ui/system';


import Grid from '@material-ui/core/Grid';


const AddSolicitud = () => {

    const [selectedProcedimiento, setSelectedProcedimiento] = React.useState(0);
    const handleProcedimientoChange = (event) => {
        setSelectedProcedimiento(event.target.value);
    };

    const [equipo, setEquipo] = React.useState([]);
    const [selectedEquipo, setSelectedEquipo] = React.useState("");
    const handleEquipoChange = (event) => {
        setSelectedEquipo(event.target.value);
    };

    const [equipamiento, setEquipamiento] = React.useState([]);
    const [selectedEquipaiento, setselectedEquipaiento] = React.useState("");
    const handleEquipamientoChange = (event) => {
        setselectedEquipaiento(event.target.value);
    };

    const [salas, setSalas] = React.useState([]);
    const [selectedSala, setSelectedSala] = React.useState("");
    const handleSalaChange = (event) => {
        setSelectedSala(event.target.value);
    };

    const [pabellones, setPabellones] = React.useState([]);
    const [selectedPabellon, setSelectedPabellon] = React.useState("");
    const handlePabellonChange = (event) => {
        setSelectedPabellon(event.target.value);
    };

    const [sillones, setSillones] = React.useState([]);
    const [selectedSillon, setSelectedSillon] = React.useState("");
    const handleSillonChange = (event) => {
        setSelectedSillon(event.target.value);
    };



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

    function crearSolicitud() {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log("Creando solicitud:"+date)
        axios.post(
            'https://lilservice.herokuapp.com/solicitar'
            , {
                fecha: date,
                tipo: selectedProcedimiento,
                idRecurso: 1,
                equipamiento:[1,2,3,4,5,6], 
                procedimiento: "Quimioterapia",
                equipo:[1,2,3,4,5,6], 
                estado: false
            }
        ).then(res => {
            console.log("Solicitud Creada: " + res)
        }
        )
    }


    useEffect(() => {
        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
            .then(res => {
                console.log(res.data);
                const persons = res.data;
                setEquipo(persons);
            })
        axios.get('https://pure-ocean-52699.herokuapp.com/apiEquipamiento/equipment')
            .then(res => {
                console.log("equipamiento: " + res.data);
                const equipamiento = res.data;
                setEquipamiento(equipamiento);
            })
        axios.get('https://gestorsp.herokuapp.com/sillones')
            .then(res => {
                console.log("Sillones: " + res.data);
                const sillone = res.data;
                setSillones(sillone);
            })

    }, []);



    return (
        <Box pt={2} mt={3}>
            <Grid container spacing={3} justify="center" pt={2}>
                <Grid item xs={10}>
                    <Card >
                        <CardContent>
                            <Box mt={4} mb={5} ml={5}>
                                <Typography gutterBottom variant="h4">
                                    {"Solicitud "}
                                </Typography>
                            </Box>
                            <Box ml={5} mr={5}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Procedimiento</Typography>
                                            <FormControl>
                                                <InputLabel id="procedimiento-label">Tipo de procedimiento</InputLabel>
                                                <Select
                                                    labelId="procedimiento-label"
                                                    id="procedimiento-select"
                                                    value={selectedProcedimiento}
                                                    onChange={handleProcedimientoChange}
                                                >
                                                    <MenuItem value={1}>{"Quimioterapia"}</MenuItem>
                                                    <MenuItem value={2}>{"Recuperación"}</MenuItem>
                                                    <MenuItem value={3}>{"Cirujía"}</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">
                                                {
                                                    "Lugar"
                                                }
                                            </Typography>
                                            <FormControl>
                                                <InputLabel id="recurso-label">Sillon</InputLabel>
                                                <Select
                                                    labelId="recurso-label"
                                                    id="recurso-select"
                                                    value={selectedSillon}
                                                    onChange={handleSillonChange}
                                                >
                                                    {
                                                        sillones.map(
                                                            (siyon) => <MenuItem value={siyon.id}>{siyon.numero_sillon}</MenuItem>
                                                        )
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>


                                    <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Equipo</Typography>
                                            <FormControl>
                                                <InputLabel id="equipo-label">Equipos</InputLabel>
                                                <Select
                                                    labelId="equipo-label"
                                                    id="equipo-select"
                                                    value={selectedEquipo}
                                                    onChange={handleEquipoChange}
                                                >
                                                    {
                                                        equipo.map(
                                                            (equipo) => <MenuItem value={equipo.idEquipo}>{equipo.nameEquipo}</MenuItem>
                                                        )
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Box mb={4}>
                                            <Typography variant="h5">Equipamiento</Typography>
                                            <FormControl>
                                                <InputLabel id="equipo-label">Equipamiento</InputLabel>
                                                <Select
                                                    labelId="equipo-label"
                                                    id="equipo-select"
                                                    value={selectedEquipo}
                                                    onChange={handleEquipoChange}
                                                >
                                                    {
                                                        equipo.map(
                                                            (equipo) => <MenuItem value={equipo.idEquipo}>{equipo.nameEquipo}</MenuItem>
                                                        )
                                                    }

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>

                            <Grid container>
                                <Grid item xs={10}></Grid>
                                <Grid item xs={2}>
                                    <Box mt={4} mb={3}>
                                        <Button onClick={() => new Promise((resolve) => {
                                            setTimeout(() => {
                                                crearSolicitud()
                                                resolve()
                                            }, 600);
                                        })} >Crear solicitud</Button>
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


export default AddSolicitud;
