import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN, AXIOS_AUTHORIZATION_HEADER } from '../config/constants';

const config: AxiosRequestConfig = {
  baseURL: 'https://playground.tesonet.lt/v1',
  headers: {
    'Content-type': 'application/json',
    [AXIOS_AUTHORIZATION_HEADER]: localStorage.getItem(ACCESS_TOKEN) ?? '',
  },
};

export const axiosClient: AxiosInstance = axios.create(config);
