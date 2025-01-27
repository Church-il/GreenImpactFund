import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(32, 213, 38),rgb(19, 140, 239));
  padding: 3rem;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  margin-top: -100px;
`;

const StyledCard = styled(Card)`
  max-width: 420px;
  width: 100%;
  background: linear-gradient(135deg, #ffffff, #f1f1f1);
  padding: -5rem;
  border-radius: 20px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 40px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 14px;
  border-radius: 30px;
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  margin-top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: #388e3c;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 24px;
  width: 100%;
  .MuiOutlinedInput-root {
    border-radius: 8px;
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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);

  async function handleLogin() {
    try {
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
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setShowCard(true);
  }, []);

  return (
    <CardContainer show={showCard}>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 3 }}>
            Welcome!
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2, fontSize: '0.9rem' }}>
              {error}
            </Typography>
          )}
          <StyledTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
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
          />
          <StyledButton variant="contained" onClick={handleLogin}>
            Login
          </StyledButton>
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
            onClick={() => navigate('/signup')}
          >
            Forgot password?
          </Typography>
        </StyledCardContent>
      </StyledCard>
    </CardContainer>
  );
}

export default Login;
