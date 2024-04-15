import { postByUrl, getByUrl, postByUrlWithConfig } from "./utils";

const baseUrl = 'http://localhost/pos-backend/api/reports';

// GET
async function getReports(){
    const endpoint = baseUrl + '/getreports.php';
    const res = getByUrl(endpoint);
    return res;
}

async function getReportById(id){
    const endpoint = baseUrl + '/getproduct.php?' + id;
    const res = getByUrl(endpoint);
    return res;
}


export default {
    getReports,
};