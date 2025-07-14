import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000
});

// Add response interceptor
API.interceptors.response.use(
  response => response,
  error => {
    const formattedError = {
      message: error.response?.data?.message || 'Network Error',
      status: error.response?.status,
      errors: error.response?.data?.errors,
      details: error.response?.data?.details
    };
    return Promise.reject(formattedError);
  }
);

export const fetchBugs = () => API.get('/bugs');
export const deleteBug = id => API.delete(`/bugs/${id}`);