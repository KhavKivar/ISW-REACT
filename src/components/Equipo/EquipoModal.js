import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create'
import EquipoNew from './EquipoNew';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';





function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}




const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    borderColor: 'rblack',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginBottom:30

  },

  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
}));

const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = {
  root: {
    background: styledBy('color', {
      red: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    }),
    border: 0,
    borderRadius: 3,
    boxShadow: styledBy('color', {
      red: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    }),
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

function MyButtonRaw(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

MyButtonRaw.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const MyButton = withStyles(styles)(MyButtonRaw);




export default function SimpleModal(props) {
  


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>

    <EquipoNew data={props.data}  
    onCloseModal={handleClose} updateValue = {props.updateEquipos} ></EquipoNew>
     
    </div>
  );

  return (
    <div>


        <MyButton
        variant="contained"
        color="red"
        startIcon={<CreateIcon />}
        onClick={handleOpen}
      >
        Agregar
      </MyButton>



      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}