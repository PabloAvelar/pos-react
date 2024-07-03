import { postByUrl, getByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/sales`;

// POST
async function postSalesOrder(data){
    const res = postByUrl(endpoint, data);
    return res;
}

// GET
async function getSalesOrder(){
    const res = getByUrl(endpoint);
    return res;
}

export default {
    getSalesOrder, postSalesOrder
};