// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  withCredentials: true, // Allow sending cookies if needed
});

export default instance;
