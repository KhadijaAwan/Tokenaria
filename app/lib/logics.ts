"use client";
import axiosInstance from "./axiosInstance";

const refreshTokenInterval = 9 * 60 * 1000;

export const startTokenRefreshTimer = () => {
    setInterval(async () => {
        try {
            console.log("Refresh Executed");
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const { data } = await axiosInstance.post("/auth/refresh-token", { refreshToken });
            console.log("Token Refreshed: ", data);
            localStorage.setItem('authToken', data.access_token);
        } catch (error) {
            console.error('Token refresh failed:', error);
        }
    }, refreshTokenInterval);
};
