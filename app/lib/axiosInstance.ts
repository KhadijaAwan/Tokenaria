"use client";
import axios from 'axios'

const baseURL = 'https://frontend-test-api.aircall.dev';

const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        let authToken = localStorage.getItem('authToken');
        return authToken ? authToken.replace(/"/g, "") : null;
    }
    return null;
};

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${getAuthToken()}` }
});

axiosInstance.interceptors.request.use(async req => {
    console.log("Axios Interceptors");
    const tokenWithoutQuotes = getAuthToken();
    if (tokenWithoutQuotes) {
        req.headers.Authorization = `Bearer ${tokenWithoutQuotes}`;
    }
    return req;
});

export default axiosInstance;