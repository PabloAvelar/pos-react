import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const endpoint = 'http://localhost/pos-backend/api/controllers';

// POST
async function login(data) {
    const urlPostLogin = endpoint + '/login.php';
    const res = postByUrl(urlPostLogin, data);
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
    login, validateToken
};