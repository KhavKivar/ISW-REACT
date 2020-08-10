import sillonService from '../services/SillonService.js';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField , LinearProgress, Grow, Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab'


class AddSillonModal extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {numero_sillon: '', numero_sala: '' , progress: false, snack: false};
        this.handleChange = this.handleChange.bind(this)
        this.addSillon = this.addSillon.bind(this)
        this.hideSnack = this.hideSnack.bind(this)

    }

    componentDidMount() {
        // this.getsillones(this.props.sillonId)
    }

    // loadSillonDetails(id) {
    //     // console.log(id,e)
    //     let ss = sillonService.viewSillon(id)
    //     ss.then(res => {
    //         console.log(res.data)
    //         this.setState({numero_sillon: res.data.numero_sillon})
    //         this.setState({numero_sala: res.data.numero_sala})
    //         this.setState({activo: res.data.activo})
    //     })
    //     this.toogleEditModal()
    // }

    handleChange(event){
        const target = event.target;
        this.setState({[target.id]: target.value})
        console.log(this.props)
    }

    hideSnack() {
        this.setState({snack: false})
    }


    addSillon(e) {
        e.preventDefault();
        let data = {...this.state}
        data['activo'] = true
        this.setState({progress: true})

        let ss = sillonService.createSillon(data)
        ss.then(res => {
            let data = res.data
            console.log(data)
            
            this.props.updateTable(data)
            this.setState({progress: false})
            this.setState({snack: true})
            this.props.toogle()
            
        })
    }

    render() {
        console.log(this.props.sillonId)
       return <>
            <Dialog open={this.props.show} onClose={this.props.toogle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Sillón {this.props.sillonId}</DialogTitle>
                <Grow in={this.state.progress}>
                    <LinearProgress />
                </Grow>
                <form onSubmit={this.addSillon}>
                    <DialogContent>
                        
                        <TextField
                        id="numero_sillon"
                        label="Número sillón"
                        placeholder="Ingresa Número sillón"
                        onChange={this.handleChange}
                        fullWidth
                        />
                        <TextField
                        id="numero_sala"
                        label="Sala del sillón"
                        placeholder="Ingresa Sala del sillón"
                        onChange={this.handleChange}
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" variant="contained" onClick={this.props.toogle}>
                            Cancelar
                        </Button>
                        <Button color="primary" variant="contained" type="submit">
                            Crear sillón
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
            open={this.state.snack}
            autoHideDuration={3000}
            onClose={this.hideSnack}
            >
                <Alert severity="success">¡Sillón agregado con exito!"</Alert>
            </Snackbar>
        </>
    }
}

export default AddSillonModal;
