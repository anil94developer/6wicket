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
    // Get token from sessionStorage
    try {
      const authState = sessionStorage.getItem('authState');
      if (authState) {
        const parsed = JSON.parse(authState);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      }
    } catch (err) {
      console.error('Error reading auth state:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    // Check if response indicates logout
    if (data?.logout === true) {
      // Clear auth state
      sessionStorage.removeItem('authState');
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
      // Return the data anyway, component can handle it
    }
    return data;
  },
  (error) => {
    console.error("API Error:", error?.response || error);
    // Check if error response indicates logout
    if (error.response?.data?.logout === true) {
      sessionStorage.removeItem('authState');
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
