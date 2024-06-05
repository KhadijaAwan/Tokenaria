"use client";
import axios from 'axios'

const baseURL = 'https://frontend-test-api.aircall.dev';

let authToken = localStorage.getItem('authToken');
const tokenWithoutQuotes = authToken ? authToken.replace(/"/g, "") : null;

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${tokenWithoutQuotes}` }
});

axiosInstance.interceptors.request.use(async req => {
    console.log("Axios Intercepters");
    let authToken = localStorage.getItem('authToken');
    const tokenWithoutQuotes = authToken ? authToken.replace(/"/g, "") : null;
    if (tokenWithoutQuotes) {
        req.headers.Authorization = `Bearer ${tokenWithoutQuotes}`;
    }
    return req;
})

export default axiosInstance;