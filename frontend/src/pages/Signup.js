import api from '../utils/api';
import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import axios from 'axios';
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/images/humanrights.jpg') no-repeat center center/cover;
  padding: 24px;
  overflow: hidden;  
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  position: relative;
  top: -85px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 24px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 16px 0;
`;

const StyledButton = styled(Button)`
  margin: 16px 0;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #1877f2;
  box-shadow: none;

  &:hover {
    background-color: #166fe5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 6px;
    background: white;

    fieldset {
      border-color: #dddfe2;
      transition: border-color 0.3s ease-in-out;
    }

    &:hover fieldset {
      border-color: #1877f2;
    }

    &.Mui-focused fieldset {
      border-color: #1877f2;
    }
  }

  .MuiInputLabel-root {
    color: #606770;
    transition: all 0.3s ease-in-out;

    &.Mui-focused {
      color: #1877f2;
    }
  }

  .MuiInputAdornment-root {
    margin-right: 8px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #dadde1;
  }
`;

const StyledLink = styled(Typography)`
  color: #1877f2;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled(Typography)`
  color: #ff1744;
  font-size: 0.875rem;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #ffebee;
  border-radius: 4px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const SuccessMessage = styled(Typography)`
  color:rgb(17, 162, 24);
  font-size: 0.875rem;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #e8f5e9;
  border-radius: 4px;
  display: ${props => props.show ? 'block' : 'none'};
`;

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await api.post(`${BASE_URL}/auth/signup`, formData); // imported API instance
      setMessage('Account Created Successfully!');
      setError('');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
      setMessage('');
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <CardContainer>
      <StyledCard>
        <StyledCardContent>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: 'red',
              marginBottom: '8px'
            }}
          >
            Make a Difference!
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'green',
              marginBottom: '24px'
            }}
          >
            Be the change you wish to see, start now.
          </Typography>

          <ErrorMessage show={error}>
            {error}
          </ErrorMessage>
          
          <SuccessMessage show={message}>
            {message}
          </SuccessMessage>

          <FormContainer>
            <StyledTextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{
                startAdornment: <AccountCircle sx={{ color: '#606770' }} />,
              }}
            />
            <StyledTextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{
                startAdornment: <Email sx={{ color: '#606770' }} />,
              }}
            />
            <StyledTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{
                startAdornment: <Lock sx={{ color: '#606770' }} />,
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </FormContainer>

          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSignup}
            disableElevation
          >
            Create Account
          </StyledButton>

          <Divider />

          <StyledLink onClick={() => navigate('/login')}>
            Already have an account? Sign in
          </StyledLink>
        </StyledCardContent>
      </StyledCard>
    </CardContainer>
  );
}

export default Signup;
