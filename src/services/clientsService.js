import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const endpoint = 'http://localhost/pos-backend/api/controllers';

// POST
async function addClient(data){
    const urlPostLogin = endpoint + '/addclient.php';
    const res = postByUrl(urlPostLogin, data);
    return res;
}

// GET
async function getClients(){
    const urlPostLogin = endpoint + '/getclients.php';
    const res = getByUrl(urlPostLogin);
    return res;
}

async function getClientById(id){
    const urlPostLogin = endpoint + '/getclient.php?'+id;
    const res = getByUrl(urlPostLogin);
    return res;
}

export default {
    addClient, getClients
};