// src/api.js
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

// ================================== Request Interceptor ===============================
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ================================== Response Interceptor ==============================
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                if (!refreshToken) {
                    throw new Error("Refresh token not found");
                }

                const res = await axios.post(`${apiUrl}/token/refresh/`, {
                    refresh: refreshToken,
                });

                if (res.status === 200) {
                    const newAccessToken = res.data.access;

                    localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                    api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } else {
                    throw new Error("Failed to refresh token");
                }
            } catch (refreshError) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = "/sign_in";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;