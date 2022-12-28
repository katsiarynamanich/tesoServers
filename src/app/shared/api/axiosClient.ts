import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN } from '../config/constants';

const config: AxiosRequestConfig = {
  baseURL: 'https://playground.tesonet.lt/v1',
  headers: {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem(ACCESS_TOKEN) ?? '',
  },
};

export const axiosClient: AxiosInstance = axios.create(config);
