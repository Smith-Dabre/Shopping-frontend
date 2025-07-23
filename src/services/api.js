import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-ip:5000/api', // Replace with your backend IP or localhost (with tunneling if needed)
});

export default api;
