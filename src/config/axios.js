import axios from "axios";
// Axios instance
const Axios = axios.create({
  baseURL: process.env.REACT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/" ,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Modify the request config (add authentication token in headers)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Handle response error (400) token related error user logout
    return Promise.reject(error);
  }
);

export default Axios;