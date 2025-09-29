import axios from 'axios';

// Backend URL
const BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, '') ||
  'https://event-registration-system-2167.onrender.com/api';

const API = axios.create({
  baseURL: BASE_URL
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
