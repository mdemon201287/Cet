// frontend/src/utils/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend base URL
});

export default instance;
