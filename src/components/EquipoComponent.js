import React from 'react';
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



import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import EquipoRow from '../components/EquipoRow';

import EquipoModal from '../components/EquipoModal';

class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            equipos:[],
         
        };
    }
    
    componentDidMount(){
        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.setState({ equipos:persons});
        })
    }

  

    render(){
      const classes = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
        return(

<div>


        <EquipoModal></EquipoModal>



        <div style = {{marginTop:20}}>         
          <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Id Equipo</TableCell>
                <TableCell align="right">Nombre Equipo</TableCell>
                <TableCell align="right">Medico a cargo</TableCell>
                <TableCell align="right">Integrantes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.equipos.map((row) => (
                <EquipoRow key={row.idEquipo} row={row} />

              ))}
            </TableBody>
          </Table>

        </TableContainer>
        </div>

        </div>
      );
      }
           

}

export default  EquipoComponent;