import sillonService from '../services/SillonService.js';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField , LinearProgress, Grow, Snackbar} from '@material-ui/core';
import { Alert } from '@material-ui/lab'


class EditSillonModal extends  React.Component {
    constructor(props) {
        super(props)
        this.state = {numero_sillon: '', numero_sala: '', progress: true, snack: false};
        this.handleChange = this.handleChange.bind(this)
        this.editSillon = this.editSillon.bind(this)
        this.hideSnack = this.hideSnack.bind(this)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.sillonId !== this.props.sillonId)
            this.loadSillonDetails(this.props.sillonId)
    }

    loadSillonDetails(id) {
        // console.log(id,e)
        this.setState({progress: true})
        let ss = sillonService.viewSillon(id)
        ss.then(res => {
            console.log(res.data)
            this.setState({numero_sillon: res.data.numero_sillon})
            this.setState({numero_sala: res.data.numero_sala})
            this.setState({activo: res.data.activo})
            this.setState({progress: false})

        })
    }

    handleChange(event){
        const target = event.target;
        this.setState({[target.id]: target.value})
        console.log(this.props)
    }

    hideSnack() {
        this.setState({snack: false})
    }

    editSillon(e) {
        e.preventDefault();
        this.setState({progress: true})
        let data = {...this.state}

        let ss = sillonService.editSillon(this.props.sillonId, data)
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
        if (this.props.sillonId === 0)
            return null
        return <>
            <Dialog open={this.props.show} onClose={this.props.toogle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar Sillón</DialogTitle>
                <Grow in={this.state.progress}>
                    <LinearProgress />
                </Grow>
                <form onSubmit={this.editSillon}>
                    <DialogContent>
                        <TextField
                        id="numero_sillon"
                        label="Número sillón"
                        placeholder="Ingresa Número sillón"
                        onChange={this.handleChange}
                        value={this.state.numero_sillon}
                        disabled={this.state.progress}
                        fullWidth
                        />
                        <TextField
                        id="numero_sala"
                        label="Sala del sillón"
                        placeholder="Ingresa Sala del sillón"
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.numero_sala}
                        disabled={this.state.progress}
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
                <Alert severity="success">¡Sillón editado con exito!"</Alert>
            </Snackbar>
        </>
    }
}

export default EditSillonModal;
