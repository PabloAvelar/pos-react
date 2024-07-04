import { postByUrl, postWithoutAuthorization, postByUrlWithConfig } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/login`;

// POST
async function login(data) {

    const res = postWithoutAuthorization(endpoint, data);
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
    login
};