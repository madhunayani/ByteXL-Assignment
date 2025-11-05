import axios from 'axios';

// Determine API base URL based on environment
const isDevelopment = import.meta.env.DEV;

const API_BASE_URL = isDevelopment
  ? 'http://localhost:3001'
  : (import.meta.env.VITE_API_URL || `${window.location.origin.replace(/:\d+$/, '')}:3001`);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
