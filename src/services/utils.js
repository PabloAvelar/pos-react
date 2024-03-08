import axios from 'axios';

export async function postByUrl(url, data){
    const _data = await axios.post(url, data);
    return _data.data;
}

export async function postByUrlWithConfig(url, data, config){
    const axiosConfig = axios.create(config);
    const _data = await axiosConfig.post(url, data);
    return _data.data;
}

export async function getByUrl(url){
    const {data} = await axios.get(url);
    return data;
}
