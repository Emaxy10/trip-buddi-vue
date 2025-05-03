import axios from 'axios';
import router from '@/router'; 
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

api.interceptors.response.use(
  response => response,

  error => {
    if(error.response && error.response.status === 401){
      //clear tokens
      const authStore = useAuthStore();
      authStore.clearTokens(); //
      alert("Not logged in")
         // Redirect to login page
      router.push('/login') // make sure 'login' is a named route
    }
    return Promise.reject(error)
  }
)

export default api;