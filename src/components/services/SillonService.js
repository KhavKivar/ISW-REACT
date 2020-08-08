import {api} from './helpers/api.js';
const basePath='sillones';

function viewAll() { return api.get(`${basePath}`); }
function viewSillon(Idsillon) {return api.get(`${basePath}/${Idsillon}`);}
function createSillon(data) {return api.post(`${basePath}`,data); }
function editSillon(Idsillon,data) {return api.put(`${basePath}/${Idsillon}`,data); }
function deleteSillon(Idsillon, data) {return api.delete(`${basePath}/${Idsillon}/delete`, data);}
function viewDeleted(){return api.get('silloneseliminados');}
const sillonService={viewAll,viewSillon,createSillon,editSillon,deleteSillon,viewDeleted};
export default sillonService;