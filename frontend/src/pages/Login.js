import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('/images/trees.jpg') no-repeat center center/cover;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  padding: 1.5rem 2rem;
  border-radius: 16px; /* Reduced rounding */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  animation: ${fadeIn} 0.8s ease-out;
  margin-top: -150px;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px -5px -5px; 
  width: 100%;
  gap: 16px;
`;


const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  border-radius: 20px; /* Adjusted rounding */
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  margin-top: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  text-transform: none;
  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 8px; /* Reduced rounding */
    &:hover {
      border-color: #1e88e5;
    }
    &.Mui-focused {
      border-color: #388e3c;
    }
  }
  .MuiInputLabel-root {
    transition: all 0.3s ease;
  }
  .MuiInputAdornment-root {
    color: gray;
  }
`;

const ErrorMessage = styled(Typography)`
  color: red;
  font-size: 0.85rem;
  margin-bottom: 16px;
  text-align: center;
`;

const RememberMeLabel = styled(FormControlLabel)`
  align-self: flex-start;
  .MuiTypography-root {
    font-size: 0.85rem;
    color: #555;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        email,
        password,
      });

      const userData = response.data;

      dispatch(loginSuccess(userData));

      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <CardContainer>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green', mb: 1 }}>
            Welcome Back!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#FD5602',
              mb: 1.5,
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            "The Earth is what we all have in common."
          </Typography>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            onKeyDown={handleKeyPress}
          />
          <StyledTextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handlePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            onKeyDown={handleKeyPress}
          />
          <RememberMeLabel
            control={<Checkbox defaultChecked size="small" sx={{ color: '#4caf50' }} />}
            label="Remember Me"
          />
          <StyledButton
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </StyledButton>
          <Typography
            variant="body2"
            sx={{
              mt: 1.5,
              fontSize: '0.85rem',
              color: '#555',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                color: 'red',
              },
            }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 0.8,
              fontSize: '0.8rem',
              color: 'green',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                color: 'red',
              },
            }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </CardContainer>
  );
}

export default Login;
