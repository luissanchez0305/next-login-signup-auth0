import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Config } from '../../../config';

const appConfig = Config.getInstance();

const getAuth = (): string | undefined => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('auth')) {
    const token = localStorage.getItem('auth') as string;
    return `Bearer ${token}`;
  }
  return undefined;
};

const setAuth = (response: AxiosResponse<any>) => {
  if (response.data?.accessToken && typeof response.data.accessToken === 'string') {
    const token: string = response.data.accessToken;
    typeof localStorage !== 'undefined' && localStorage.setItem('auth', token);
  }
};

const baseHeaders = (): any => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getAuth(),
  };
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: appConfig.apiBaseURL,
  timeout: appConfig.apiReqTimeout,
  headers: baseHeaders(),
  validateStatus: function () {
    return true;
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  function (response) {
    setAuth(response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const headers = config.headers || {};
  config.headers = { ...headers, ...baseHeaders() };
  return config;
});

export { axiosInstance as axiosClient, axiosConfig };
