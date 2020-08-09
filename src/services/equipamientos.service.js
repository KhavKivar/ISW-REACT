import {api} from '../components/services/helpers/api';
const basePath =  'https://pure-ocean-52699.herokuapp.com/api/'
//const basePath = '/api';


function getAll() {
    //return api.get(`https://pure-ocean-52699.herokuapp.com/api/equipamiento`);
    return api.get(`${basePath}/equipamiento`);
}

function show(equipamientoId) {
    return(
        api.get(`${basePath}/?id=${equipamientoId}`)
    );
}

function create(data) {
    return(
        api.post(`${basePath}/`,data)
    );
}

const equipamientosService = {getAll, show, create,};
export default equipamientosService;