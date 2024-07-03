import { postByUrl, getByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/statistics`;

// GET
async function getFrequentCostumers(){
    const res = getByUrl(`${endpoint}/frequentcustomers`);
    return res;
}

async function getNumSales(){
    const res = getByUrl(`${endpoint}/sales`);
    return res;
}

async function getProductsSold(){
    const res = getByUrl(`${endpoint}/productssold`);
    return res;
}

export default {
    getNumSales, getProductsSold, getFrequentCostumers
};