import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const endpoint = 'http://localhost/pos-backend/api/controllers';

// POST
async function login(data) {
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

async function validateToken(data) {
    const urlPostValidation = endpoint + '/validate.php';
    // configuration
    const config = {
        baseURL: urlPostValidation,
        timeout: 3000,
        headers: { Authorization: `bearer ${data}` }
        };

    const res = postByUrlWithConfig(urlPostValidation, data, config);
    return res;
}

export default {
    login, addClient, getClients, validateToken
};