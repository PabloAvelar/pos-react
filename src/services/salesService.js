import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/sales';

// POST
async function postSalesOrder(data){
    const endpoint = baseUrl + '/postsalesorder.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getSalesOrder(){
    const endpoint = baseUrl + '/getsalesorder.php';
    const res = getByUrl(endpoint);
    return res;
}

export default {
    getSalesOrder, postSalesOrder
};