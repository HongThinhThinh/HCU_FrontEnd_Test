import axios from "axios";

const api = axios.create({
  baseURL: "https://66bb0c536a4ab5edd636ff75.mockapi.io/api/",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
