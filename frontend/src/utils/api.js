import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD || 'https://greenimpactfund.onrender.com'
    : process.env.REACT_APP_API_URL_DEV || 'http://127.0.0.1:5000';

if (process.env.REACT_APP_ENV !== 'production') {
  console.log('Base URL:', BASE_URL);
}

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token found');

        const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken });
        localStorage.setItem('token', data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError.message);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    console.error('API error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
