import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/controllers';

// PUT pero en realidad es post porque pinche php es una mierda
async function putProduct(data){
    const endpoint = baseUrl + '/putproduct.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// POST

async function postProduct(data){
    const endpoint = baseUrl + '/postproduct.php';
    const res = postByUrl(endpoint, data);
    return res;
}
 
// GET
async function getProducts(){
    const endpoint = baseUrl + '/getproducts.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getProductById(id){
    const endpoint = baseUrl + '/getproduct.php?' + id;
    const res = getByUrl(endpoint);
    return res;
}

// DELETE
async function deleteProduct(data){
    const endpoint = baseUrl + '/deleteproduct.php';
    const res = postByUrl(endpoint, data);
    return res;
}

export default {
    putProduct, getProducts, postProduct, deleteProduct
};