import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = "34933515-459232b17502304624af8690b";

export const getSearchPhoto = (q, page=1) => {
    return axios
        .get("",{params: { key: API_KEY, q, per_page: 10, page,} })
        .then((res) => res.data);
};