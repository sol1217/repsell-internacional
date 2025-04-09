import axios from "axios";
import { getToken } from "@/services/auth";
import { api } from "@/utils/config";

const axiosInstance = axios.create({
  baseURL: api,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("🔴 No hay token válido. La petición podría fallar.");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
