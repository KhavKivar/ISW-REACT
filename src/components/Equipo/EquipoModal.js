import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create'
import EquipoNew from './EquipoNew';


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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginBottom:30

  },
}));

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

    <EquipoNew  onCloseModal={handleClose} updateValue = {props.updateEquipos} ></EquipoNew>
     
    </div>
  );

  return (
    <div>

<Button 
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<CreateIcon />}
        onClick={handleOpen}
        


      >
        Agregar
      </Button>

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