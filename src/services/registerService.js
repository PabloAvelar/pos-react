import { postByUrl } from "./utils";

const endpoint = 'http://localhost/pos-backend/api';

async function login(data){
    const urlPostLogin = endpoint + '/login.php';
    const res = postByUrl(urlPostLogin, data);
    return res;
}

export default{
    login
};