import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api",

    headers: {
        Accept: "applicattion/json",
        "Content-Type": "multipart/form-data"
    },
})

export default api;