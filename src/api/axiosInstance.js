// src/api/axiosInstance.js

import axios from "axios";

// Use proxy in development, direct URL in production
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    // Use proxy if setupProxy.js is configured
    return '/api/v1';
  }
  return  "https://usabet9.com/api/v1";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // cookies (cf_clearance etc.) ke liye IMPORTANT
  timeout: 15000,
});

// Optional: request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
