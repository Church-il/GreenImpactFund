import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        email,
        password,
      });

      const userData = response.data;

      // Dispatch Redux action
      dispatch(loginSuccess(userData));

      // Redirect to the home page
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <PageWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          background: 'linear-gradient(135deg, #e8f5e9, #e3f2fd)', // Subtle background gradient
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: 5,
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #a5d6a7, #80deea)',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 3 }}>
              Welcome Back!
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2, fontSize: '0.9rem' }}>
                {error}
              </Typography>
            )}
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                borderRadius: '8px',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
                backgroundColor: '#ffffff',
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                mb: 3,
                borderRadius: '8px',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
                backgroundColor: '#ffffff',
              }}
            />
            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              sx={{
                borderRadius: '20px',
                padding: '12px',
                backgroundColor: '#4caf50',
                color: 'white',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                fontSize: '0.9rem',
                color: '#555',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#388e3c',
                },
              }}
            >
              Forgot password?
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </PageWrapper>
  );
}

export default Login;
