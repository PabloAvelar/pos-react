import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/controllers';

// PUT pero en realidad es post porque pinche php es una mierda
async function putSupplier(data){
    const endpoint = baseUrl + '/putsupplier.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// POST

async function postSupplier(data){
    const endpoint = baseUrl + '/postsupplier.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getSuppliers(){
    const endpoint = baseUrl + '/getsuppliers.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getSupplierById(id){
    const endpoint = baseUrl + '/getsupplier.php?'+id;
    const res = getByUrl(endpoint);
    return res;
}

// DELETE
async function deleteSupplier(data){
    const endpoint = baseUrl + '/deletesupplier.php';
    const res = postByUrl(endpoint, data);
    return res;
}

export default {
    putSupplier, getSuppliers, postSupplier, deleteSupplier
};