import {api} from '../components/services/helpers/apiEquipment';
const basePath =  '/apiEquipamiento'
//const basePath = '/api';


function getAll() { //@GetMapping("/equipment")
    return api.get(`${basePath}/equipment`);
}


function show(equipamientoId) { //@GetMapping("/")
    return(
        api.get(`${basePath}/?id=${equipamientoId}`)
    );
}



function create(data) {   // @PostMapping("/equipment")
    console.log(data)
    return api.post(`${basePath}/equipment`,data);
}

const equipamientosService = {getAll, show, create,};
export default equipamientosService;