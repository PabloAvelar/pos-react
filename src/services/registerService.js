import { postByUrl } from "./utils";

const endpoint = 'http://localhost/pos-backend/api/controllers';

async function login(data){
    const urlPostLogin = endpoint + '/login.php';
    const res = postByUrl(urlPostLogin, data);
    return res;
}

export default{
    login
};