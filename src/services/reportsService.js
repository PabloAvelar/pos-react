import { postByUrl, getByUrl } from "./utils";

const endpoint = `${process.env.REACT_APP_API_URL}/reports`;

// GET
async function getReports(){
    const res = getByUrl(endpoint);
    return res;
}

// async function getReportById(id){
//     const endpoint = baseUrl + '/getproduct.php?' + id;
//     const res = getByUrl(endpoint);
//     return res;
// }


export default {
    getReports,
};