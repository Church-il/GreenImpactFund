import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; // Convert exp to milliseconds
  } catch {
    return true;
  }
}

const token = localStorage.getItem('token');
const isAuthenticated = token && !isTokenExpired(token);

const initialState = {
  user: isAuthenticated ? jwtDecode(token) : null, // Decode user info if token is valid
  token: isAuthenticated ? token : null,
  isAuthenticated,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Ensure backend returns user info
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
