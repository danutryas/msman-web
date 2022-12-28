import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    // withCredentials: true,
    headers : {
        'Content-Type': 'application/json'
    },
    params : {
        api_key : process.env.REACT_APP_API_KEY,
    }
})
