import axios from "axios";

const BASE_URl = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDBhY2QwZTI2NTQ5NWZjZTU5NDUyNGM2MDRjYzNmZCIsInN1YiI6IjY1MzUwYTAyYzE0ZmVlMDBlMzVlZjgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gxze5wr6fj_5EB1LDaXVebdAo3CDVcGAIxU2j4za-cw';

const headers = {
    Authorization: 'bearer ' + API_TOKEN
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URl + url, {
            headers,
            params
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};