import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers["X-RapidAPI-Key"] = import.meta.env.VITE_RAPIDAPI_KEY;
    config.headers["X-RapidAPI-Host"] = "url-link-shortener-and-qr-code-generator.p.rapidapi.com";
    config.headers['Content-Type'] = 'application/json';
    config.headers["X-RapidAPI-Secret"] = import.meta.env.VITE_RAPIDAPI_SECRET;
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
