import axios from 'axios';

async function authExtractor() {
    const storedToken = await JSON.parse(localStorage.getItem('token'));
    return storedToken;
}

export async function postByUrl(url, data) {
    const { accessToken } = await authExtractor();
    const _data = await axios.post(url, data,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    return _data.data;
}

export async function postWithoutAuthorization(url, data) {
    const _data = await axios.post(url, data);
    return _data.data;
}

export async function putByUrl(url, data) {
    const { accessToken } = await authExtractor();
    const _data = await axios.put(url, data,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    return _data.data;
}

export async function deleteByUrl(url) {
    const { accessToken } = await authExtractor();
    const _data = await axios.delete(url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    return _data.data;
}

export async function postByUrlWithConfig(url, data, config) {
    const axiosConfig = axios.create(config);
    const _data = await axiosConfig.post(url, data);
    return _data.data;
}

export async function getByUrl(url) {
    const { accessToken } = await authExtractor();
    const { data } = await axios.get(url,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    return data;
}
