import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";

export interface ApiResponse<T = any> {
  mfa: any;
  jwt: string;
  status: boolean;
  path: string;
  message?: string;
  statusCode: number;
  data?: T;
  timestamp: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Set your API URL in .env
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
