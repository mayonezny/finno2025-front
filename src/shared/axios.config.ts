import axios from 'axios';
import { API_URL } from './constants';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false, //если появятся креды это нужно будет переключить
  timeout: 30000,
});
