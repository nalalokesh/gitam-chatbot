import axios from 'axios';

const api = axios.create({
    baseURL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') 
        ? 'http://localhost:5000/api' 
        : 'https://gitam-chatbot-2.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
