import { postByUrl, getByUrl } from "./utils";

const endpoint = 'http://localhost/pos-backend/api/controllers';

// POST
async function login(data){
    const urlPostLogin = endpoint + '/login.php';
    const res = postByUrl(urlPostLogin, data);
    return res;
}

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

export default{
    login, addClient, getClients
};