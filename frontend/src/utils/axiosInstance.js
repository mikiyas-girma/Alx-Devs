import axios from 'axios';

const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api/v1/',
  baseURL: 'https://172e-196-189-224-7.ngrok-free.app/api/v1/',
  withCredentials: true,
  credentials: 'include',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('token'),
  },
});

export default axiosInstance;
