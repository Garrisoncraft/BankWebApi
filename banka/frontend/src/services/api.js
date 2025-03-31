import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
      console.error('Error response:', error.response); // Log the full error response for debugging
    } else {
      console.error('Error:', error.message); // Log the error message if no response
    }
    return Promise.reject(error);
  }
);

export default api;
