import { postByUrl, getByUrl, putByUrl, deleteByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/clients`;

// GET
async function getClients(){
    const res = getByUrl(endpoint);
    return res;
}

// async function getClientById(id){
//     const endpoint = baseUrl + '/getclient.php?'+id;
//     const res = getByUrl(endpoint);
//     return res;
// }

// POST
async function postClient(data){
    const res = postByUrl(endpoint, data);
    return res;
}

// PUT
async function putClient(data){
    const res = putByUrl(endpoint, data);
    return res;
}

// DELETE
async function deleteClient(data){
    const res = deleteByUrl(`${endpoint}`, data);
    return res;
}

export default {
    putClient, getClients, postClient, deleteClient
};