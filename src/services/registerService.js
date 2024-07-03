import { postByUrl, getByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/login`;

// POST
async function login(data) {

    console.log(endpoint)
    return
    const res = postByUrl(endpoint, data);
    return res;
}

// async function validateToken(data) {
//     const urlPostValidation = endpoint + '/validate.php';
//     // configuration
//     const config = {
//         baseURL: urlPostValidation,
//         timeout: 3000,
//         headers: { Authorization: `bearer ${data}` }
//         };

//     const res = postByUrlWithConfig(urlPostValidation, data, config);
//     return res;
// }

export default {
    login
};