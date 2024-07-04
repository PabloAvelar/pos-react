import { postByUrl, getByUrl, putByUrl, deleteByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/suppliers`;

// PUT
async function putSupplier(data){
    const res = putByUrl(endpoint, data);
    return res;
}

// POST

async function postSupplier(data){
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getSuppliers(){
    const res = getByUrl(endpoint);
    return res;
}

// async function getSupplierById(id){
//     const endpoint = baseUrl + '/getsupplier.php?'+id;
//     const res = getByUrl(endpoint);
//     return res;
// }

// DELETE
async function deleteSupplier(data){
    const res = deleteByUrl(`${endpoint}/${data}`);
    return res;
}

export default {
    putSupplier, getSuppliers, postSupplier, deleteSupplier
};