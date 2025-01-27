import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import axios from 'axios';
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 105vh;
  background: linear-gradient(135deg,rgb(18, 198, 24), #2196f3); 
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
  margin-top: -80px; 
`;

const StyledCard = styled(Card)`
  max-width: 450px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  background: white; 
`;

const StyledCardContent = styled(CardContent)`
  padding: 40px;
  text-align: center;
  background: #ffffff;
  border-radius: 20px;
`;

const StyledButton = styled(Button)`
  border-radius: 30px;
  padding: 14px;
  background-color: #1e88e5;
  color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  .MuiOutlinedInput-root {
    border-radius: 20px;
    &:hover {
      border-color: #1e88e5;
    }
  }
  .MuiInputLabel-root {
    transition: all 0.3s ease;
  }
  .MuiInput-root {
    transition: all 0.3s ease;
  }
  .MuiInputAdornment-root {
    color: gray;
  }
`;

const StyledLink = styled(Typography)`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #1565c0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/signup', {
        username,
        email,
        password,
      });
      setMessage('Signup successful! Please log in.');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (err) {
      setError('Signup failed. Please try again.');
      setMessage('');
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    setShowCard(true);
  }, []);

  return (
    <CardContainer show={showCard}>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1565C0', mb: 3 }}>
            Be the Change!
          </Typography>
          {message && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <StyledTextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <AccountCircle sx={{ color: 'gray', mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <Email sx={{ color: 'gray', mr: 1 }} />,
            }}
          />
          <StyledTextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: <Lock sx={{ color: 'gray', mr: 1 }} />,
              endAdornment: (
                <IconButton onClick={handlePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleSignup}
          >
            Signup
          </StyledButton>
          <StyledLink onClick={() => navigate('/login')}>
            Already have an account? Login
          </StyledLink>
        </StyledCardContent>
      </StyledCard>
    </CardContainer>
  );
}

export default Signup;
