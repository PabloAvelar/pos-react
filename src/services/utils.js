export async function postByUrl(url, data){
    const _data = await axios.post(url, data);
    return _data.data;
}

export async function getByUrl(url){
    const {data} = await axios.get(url);
    return data;
}