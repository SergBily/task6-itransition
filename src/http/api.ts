import axios, { AxiosInstance } from 'axios';
import SERVER_URL from '../environment';

const $api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default $api;
