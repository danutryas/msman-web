import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // withCredentials: true,
    headers : {
        'Content-Type': 'application/json'
    },
    params : {
        api_key : process.env.REACT_APP_API_KEY,
    }
})
