import axios from 'axios';

export async function postByUrl(url, data){
    const _data = await axios.post(url, data);
    return _data.data;
}

export async function putByUrl(url, data){
    const _data = await axios.put(url, data);
    return _data.data;
}

export async function deleteByUrl(url, data){
    const _data = await axios.delete(url, data);
    return _data.data;
}

export async function getByUrl(url){
    const {data} = await axios.get(url);
    return data;
}
