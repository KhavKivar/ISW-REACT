import React,{useState} from 'react';
import axios from 'axios';


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { xml } from 'd3';


class EquipoRow extends React.Component{
    constructor(){
        super();
        this.state = {
            open:   false
        }

        


    }


    


    render(){
        const { row } = this.props;
       
        const classes = makeStyles({
          root: {
            '& > *': {
              borderBottom: 'unset',
            },
          },
        });

        return (
            <React.Fragment>
              <TableRow className={classes.root}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => this.setState({open:true})}>
                    {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.idEquipo}
                </TableCell>
                <TableCell align="right">{row.nameEquipo}</TableCell>
                <TableCell align="right">{row.director}</TableCell>
                <TableCell align="right">{row.integrantes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        Personas
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Apellido</TableCell>
                            <TableCell align="right">Identificador</TableCell>
                            <TableCell align="right">Especializacion</TableCell>
                            <TableCell align="right">Estado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.personas.map((x) => (
                            <TableRow key={x.idPersona}>
                              <TableCell component="th" scope="row">
                                {x.idPersona}
                              </TableCell>
                              <TableCell>{x.nombre}</TableCell>
                              <TableCell align="right">{x.apellido}</TableCell>
                              <TableCell align="right">  {x.identificador}
                              </TableCell>
                              <TableCell align="right">  {x.especializacion}
                              </TableCell>
                              <TableCell align="right">  {x.estado}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );


    }




}

export default EquipoRow;