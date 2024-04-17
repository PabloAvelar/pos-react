import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/statistics';

// GET
async function getProductsSold(){
    const endpoint = baseUrl + '/getproductssold.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getNumSales(){
    const endpoint = baseUrl + '/getnumsales.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getFrequentCostumers(){
    const endpoint = baseUrl + '/getfrequentcostumers.php';
    const res = getByUrl(endpoint);
    return res;
}

export default {
    getNumSales, getProductsSold, getFrequentCostumers
};