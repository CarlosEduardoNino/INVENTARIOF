import axios from 'axios';

const apiClient = axios.create({
 /*   baseURL: 'http://localhost:3000/api',   */
 baseURL: 'https://inventario-xha6.onrender.com/api',  
  headers: {
    'Content-Type': 'application/json', 
  },
});


apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers['x-token'] = token; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
