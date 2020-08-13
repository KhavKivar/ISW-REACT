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


const AddReserva = () => {

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

    function crearReserva() {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log("Creando solicitud:"+date)
        axios.post(
            'https://lilservice.herokuapp.com/solicitar'
            , {
                //TODO: Agregar datos de reserva
            }
        ).then(res => {
            console.log("Reserva Creada: " + res)
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
                                    {"Reserva "}
                                </Typography>
                            </Box>
                            <Box ml={5} mr={5}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Fecha</Typography>
                                            <FormControl>
                                                <InputLabel id="procedimiento-label">Día</InputLabel>
                                                <Select
                                                    labelId="procedimiento-label"
                                                    id="procedimiento-select"
                                                    value={selectedProcedimiento}
                                                    onChange={handleProcedimientoChange}
                                                >
                                                    <MenuItem value={"01"}>{"01"}</MenuItem>
                                                    <MenuItem value={"02"}>{"02"}</MenuItem>
                                                    <MenuItem value={"03"}>{"03"}</MenuItem>
                                                    <MenuItem value={"04"}>{"04"}</MenuItem>
                                                    <MenuItem value={"05"}>{"05"}</MenuItem>
                                                    <MenuItem value={"06"}>{"06"}</MenuItem>
                                                    <MenuItem value={"07"}>{"07"}</MenuItem>
                                                    <MenuItem value={"08"}>{"08"}</MenuItem>
                                                    <MenuItem value={"09"}>{"09"}</MenuItem>
                                                    <MenuItem value={"10"}>{"10"}</MenuItem>
                                                    <MenuItem value={"11"}>{"11"}</MenuItem>
                                                    <MenuItem value={"12"}>{"12"}</MenuItem>
                                                    <MenuItem value={"13"}>{"13"}</MenuItem>
                                                    <MenuItem value={"14"}>{"14"}</MenuItem>
                                                    <MenuItem value={"15"}>{"15"}</MenuItem>
                                                    <MenuItem value={"16"}>{"16"}</MenuItem>
                                                    <MenuItem value={"17"}>{"17"}</MenuItem>
                                                    <MenuItem value={"18"}>{"18"}</MenuItem>
                                                    <MenuItem value={"19"}>{"19"}</MenuItem>
                                                    <MenuItem value={"20"}>{"20"}</MenuItem>
                                                    <MenuItem value={"21"}>{"21"}</MenuItem>
                                                    <MenuItem value={"22"}>{"22"}</MenuItem>
                                                    <MenuItem value={"23"}>{"23"}</MenuItem>
                                                    <MenuItem value={"24"}>{"24"}</MenuItem>
                                                    <MenuItem value={"25"}>{"25"}</MenuItem>
                                                    <MenuItem value={"26"}>{"26"}</MenuItem>
                                                    <MenuItem value={"27"}>{"27"}</MenuItem>
                                                    <MenuItem value={"28"}>{"28"}</MenuItem>
                                                    <MenuItem value={"29"}>{"29"}</MenuItem>
                                                    <MenuItem value={"30"}>{"30"}</MenuItem>
                                                    <MenuItem value={"31"}>{"31"}</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <InputLabel id="procedimiento-label">Mes</InputLabel>
                                                <Select
                                                    labelId="procedimiento-label"
                                                    id="procedimiento-select"
                                                    value={selectedProcedimiento}
                                                    onChange={handleProcedimientoChange}
                                                >
                                                    <MenuItem value={"01"}>{"Enero"}</MenuItem>
                                                    <MenuItem value={"02"}>{"Febrero"}</MenuItem>
                                                    <MenuItem value={"03"}>{"Marzo"}</MenuItem>
                                                    <MenuItem value={"04"}>{"Abril"}</MenuItem>
                                                    <MenuItem value={"05"}>{"Mayo"}</MenuItem>
                                                    <MenuItem value={"06"}>{"Junio"}</MenuItem>
                                                    <MenuItem value={"07"}>{"Julio"}</MenuItem>
                                                    <MenuItem value={"08"}>{"Agosto"}</MenuItem>
                                                    <MenuItem value={"09"}>{"Septiembre"}</MenuItem>
                                                    <MenuItem value={"10"}>{"Octubre"}</MenuItem>
                                                    <MenuItem value={"11"}>{"Noviembre"}</MenuItem>
                                                    <MenuItem value={"12"}>{"Diciembre"}</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Hora de inicio</Typography>
                                            <FormControl>
                                                <InputLabel id="inicio-label">Seleccione hora</InputLabel>
                                                <Select
                                                    labelId="inicio-label"
                                                    id="inicio-select"
                                                    value={selectedEquipo}
                                                    onChange={handleEquipoChange}
                                                >
                                                    <MenuItem value={"08:00"}>{"08:00"}</MenuItem>
                                                    <MenuItem value={"08:30"}>{"08:30"}</MenuItem>
                                                    <MenuItem value={"09:00"}>{"09:00"}</MenuItem>
                                                    <MenuItem value={"09:30"}>{"09:30"}</MenuItem>
                                                    <MenuItem value={"10:00"}>{"10:00"}</MenuItem>
                                                    <MenuItem value={"10:30"}>{"10:30"}</MenuItem>
                                                    <MenuItem value={"11:00"}>{"11:00"}</MenuItem>
                                                    <MenuItem value={"11:30"}>{"11:30"}</MenuItem>
                                                    <MenuItem value={"12:00"}>{"12:00"}</MenuItem>
                                                    <MenuItem value={"12:30"}>{"12:30"}</MenuItem>
                                                    <MenuItem value={"13:00"}>{"13:00"}</MenuItem>
                                                    <MenuItem value={"13:30"}>{"13:30"}</MenuItem>
                                                    <MenuItem value={"14:00"}>{"14:00"}</MenuItem>
                                                    <MenuItem value={"14:30"}>{"14:30"}</MenuItem>
                                                    <MenuItem value={"15:00"}>{"15:00"}</MenuItem>
                                                    <MenuItem value={"15:30"}>{"15:30"}</MenuItem>
                                                    <MenuItem value={"16:00"}>{"16:00"}</MenuItem>
                                                    <MenuItem value={"16:30"}>{"16:30"}</MenuItem>
                                                    <MenuItem value={"17:00"}>{"17:00"}</MenuItem>
                                                    <MenuItem value={"17:30"}>{"17:30"}</MenuItem>


                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box mb={4}>
                                            <Typography variant="h5">Hora de termino</Typography>
                                            <FormControl>
                                                <InputLabel id="termino-label">Seleccione hora</InputLabel>
                                                <Select
                                                    labelId="termino-label"
                                                    id="termino-select"
                                                    value={selectedPabellon}
                                                    onChange={handlePabellonChange}
                                                >
                                                    <MenuItem value={"08:30"}>{"08:30"}</MenuItem>
                                                    <MenuItem value={"09:00"}>{"09:00"}</MenuItem>
                                                    <MenuItem value={"09:30"}>{"09:30"}</MenuItem>
                                                    <MenuItem value={"10:00"}>{"10:00"}</MenuItem>
                                                    <MenuItem value={"10:30"}>{"10:30"}</MenuItem>
                                                    <MenuItem value={"11:00"}>{"11:00"}</MenuItem>
                                                    <MenuItem value={"11:30"}>{"11:30"}</MenuItem>
                                                    <MenuItem value={"12:00"}>{"12:00"}</MenuItem>
                                                    <MenuItem value={"12:30"}>{"12:30"}</MenuItem>
                                                    <MenuItem value={"13:00"}>{"13:00"}</MenuItem>
                                                    <MenuItem value={"13:30"}>{"13:30"}</MenuItem>
                                                    <MenuItem value={"14:00"}>{"14:00"}</MenuItem>
                                                    <MenuItem value={"14:30"}>{"14:30"}</MenuItem>
                                                    <MenuItem value={"15:00"}>{"15:00"}</MenuItem>
                                                    <MenuItem value={"15:30"}>{"15:30"}</MenuItem>
                                                    <MenuItem value={"16:00"}>{"16:00"}</MenuItem>
                                                    <MenuItem value={"16:30"}>{"16:30"}</MenuItem>
                                                    <MenuItem value={"17:00"}>{"17:00"}</MenuItem>
                                                    <MenuItem value={"17:30"}>{"17:30"}</MenuItem>
                                                    <MenuItem value={"18:00"}>{"18:00"}</MenuItem>

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
                                                crearReserva()
                                                resolve()
                                            }, 600);
                                        })} >Crear reserva</Button>
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


export default AddReserva;
