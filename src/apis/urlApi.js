import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL; 

const createUrl = async(originalUrl) =>{
try {
    console.log("originalurl", originalUrl);
    const response = await axios.post(`${URL}/shorten`, {originalUrl})
    console.log("response", response?.data?.link)
    return response?.data?.link?.shortcode
} catch (error) {
    console.error('url creation failed', error.response?.data || error);
    return error.response?.data || error;
}
}

export {createUrl}