import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

        if (token) {
            config["headers"] = {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            };
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default API;
