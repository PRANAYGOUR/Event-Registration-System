import axios from 'axios';

// Backend URL - Use environment variable first, then detect environment
const getBaseUrl = () => {
  // If REACT_APP_API_URL is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL.replace(/\/$/, '');
  }
  
  // For local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api';
  }
  
  // For production (Vercel frontend)
  return 'https://event-registration-system-2167.onrender.com/api';  // Your Render backend
};

const BASE_URL = getBaseUrl();

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for CORS with credentials
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Set auth token for requests
export function setAuthToken(token) {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

// 🔹 Auth APIs
export const studentLogin = (formData) => API.post("/auth/login", formData);
export const studentRegister = (formData) => API.post("/auth/register", formData);

// 🔹 Admin APIs
export const adminLogin = (formData) => API.post("/admin/login", formData);

export default API;
