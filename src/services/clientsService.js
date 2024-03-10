import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/controllers';

// PUT pero en realidad es post porque pinche php es una mierda
async function putClient(data){
    const endpoint = baseUrl + '/putclient.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// POST

async function postClient(data){
    const endpoint = baseUrl + '/postclient.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getClients(){
    const endpoint = baseUrl + '/getclients.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getClientById(id){
    const endpoint = baseUrl + '/getclient.php?'+id;
    const res = getByUrl(endpoint);
    return res;
}

// DELETE
async function deleteClient(data){
    const endpoint = baseUrl + '/deleteclient.php';
    const res = postByUrl(endpoint, data);
    return res;
}

export default {
    putClient, getClients, postClient, deleteClient
};