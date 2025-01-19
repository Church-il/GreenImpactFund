import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSignup() {
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/signup', {
        username,
        email,
        password,
      });
      setMessage('Signup successful! Please log in.');
      setError('');
    } catch (err) {
      setError('Signup failed. Please try again.');
      setMessage('');
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
          background: 'linear-gradient(135deg, #e3f2fd, #fce4ec)', // Subtle background gradient
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
              background: 'linear-gradient(135deg, #80deea, #ffccbc)',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1565C0', mb: 3 }}>
              Join Us!
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
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                backgroundColor: '#ffffff',
              }}
              InputProps={{
                startAdornment: <AccountCircle sx={{ color: 'gray', mr: 1 }} />,
              }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                mb: 3,
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                backgroundColor: '#ffffff',
              }}
              InputProps={{
                startAdornment: <Email sx={{ color: 'gray', mr: 1 }} />,
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
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
                backgroundColor: '#ffffff',
              }}
              InputProps={{
                startAdornment: <Lock sx={{ color: 'gray', mr: 1 }} />,
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: '24px',
                padding: '12px',
                backgroundColor: '#1E88E5',
                color: '#ffffff',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#1565C0',
                },
              }}
              onClick={handleSignup}
            >
              Signup
            </Button>
          </CardContent>
        </Card>
      </Box>
    </PageWrapper>
  );
}

export default Signup;
