import axios from 'axios';
import { useToken } from "@/composables/useToken";

const apiUrl = process.env.VUE_APP_API_URL

const appApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

const { getToken } = useToken()

appApi.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${getToken()}`
  return request;
});

export { appApi };

