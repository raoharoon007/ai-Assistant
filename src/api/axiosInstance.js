import axios from "axios";

const api = axios.create({
    baseURL: "http://98.81.203.81/ai-health", 
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: Har request ke sath token automatic bhejne ke liye
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
