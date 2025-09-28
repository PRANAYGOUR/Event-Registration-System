import axios from 'axios';

// Replace with your Render backend URL
const BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, '') 
                 || 'https://event-registration-system-2167.onrender.com/api';

const API = axios.create({
  baseURL: BASE_URL
});

export function setAuthToken(token) {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

export default API;
