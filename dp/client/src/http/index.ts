import axios from "axios";

export const API_URL = "http:/localhost:5000/api";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use(config => config, async (error) => {
    const origRequest = error.config;

    if(error.response.status === 401 && error.config && !error.config.is_checked){
       origRequest.is_checked = true;
       try {
         const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
         localStorage.setItem('token', response.data.accessToken);
         return $api.request(origRequest);
       } catch (error) {
         console.log("Пользователь не авторизован");
       }
    }
    throw error;
})

export default $api;