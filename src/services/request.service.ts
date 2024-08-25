import axios from 'axios';
import {ENV_BASE_URL, NEWS_API_KEY} from '@env';

const axiosInstance = axios.create({
  baseURL: ENV_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    console.log('Request interceptor invoked');
    config.params = {...config.params, apiKey: NEWS_API_KEY};
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export default axiosInstance;
