import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN, AXIOS_AUTHORIZATION_HEADER } from '../config/constants';

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
    [AXIOS_AUTHORIZATION_HEADER]: localStorage.getItem(ACCESS_TOKEN) ?? '',
  },
};

export const axiosClient: AxiosInstance = axios.create(config);
