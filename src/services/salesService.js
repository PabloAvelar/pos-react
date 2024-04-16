import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/sales';

// POST
async function postSales(data){
    const endpoint = baseUrl + '/postsales.php';
    const res = postByUrl(endpoint, data);
    return res;
}

async function postSalesOrder(data){
    const endpoint = baseUrl + '/postsalesorder.php';
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getSales(){
    const endpoint = baseUrl + '/getsales.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getSalesOrder(){
    const endpoint = baseUrl + '/getsalesorder.php';
    const res = getByUrl(endpoint);
    return res;
}

export default {
    getSales, getSalesOrder, postSales, postSalesOrder
};