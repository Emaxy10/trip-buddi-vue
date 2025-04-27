import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
    baseURL: 'http://localhost/trip-buddy/public/api/',
    headers: { 'Content-Type': 'application/json' },
});

// Request Interceptor: Attach access token to every request
api.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore();
      if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default api;