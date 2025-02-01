import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://www.greenimpactfund.com' // Production URL
  : 'http://127.0.0.1:5000'; // Development URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const { data } = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
          const { accessToken } = data;
          localStorage.setItem('token', accessToken);  // Update token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Set the new token
          return api(originalRequest);  // Retry the original request with the new token
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        window.location.href = '/login';  // Redirect to login if refresh fails
      }
    }

    // Handling other errors
    if (error.response) {
      console.error('API error:', error.response.data.message || error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
