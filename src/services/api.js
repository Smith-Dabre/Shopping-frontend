import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.10.96.30:3000/api/',
});

export default api;
