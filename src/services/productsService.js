import { postByUrl, getByUrl, putByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/products`;

// GET
async function getProducts(){
    const res = getByUrl(endpoint);
    return res;
}

// async function getProductById(id){
//     const endpoint = baseUrl + '/getproduct.php?' + id;
//     const res = getByUrl(endpoint);
//     return res;
// }

// POST
async function postProduct(data){
    const res = postByUrl(endpoint, data);
    return res;
}

// PUT
async function putProduct(data){
    const res = putByUrl(endpoint, data);
    return res;
}

// DELETE
async function deleteProduct(data){
    const res = postByUrl(endpoint, data);
    return res;
}

export default {
    putProduct, getProducts, postProduct, deleteProduct
};