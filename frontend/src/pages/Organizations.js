import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';
import { useNavigate } from 'react-router-dom';

function Organizations() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Get user token
  const navigate = useNavigate();

  const handleApply = async () => {
    if (!token) {
      setMessage('You must be logged in to apply.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/organizations/apply',
        { name, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Application submitted successfully!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        setMessage('Failed to submit application. Please try again.');
      }
    }
  };

  return (
    <PageWrapper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e8f5e9, #e3f2fd)',
          p: 3,
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            borderRadius: 4,
            boxShadow: 5,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <CardContent
            sx={{
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #a5d6a7, #80deea)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 3 }}>
              Apply as an Organization
            </Typography>
            {message && (
              <Typography
                color={message.includes('successfully') ? 'primary' : 'error'}
                sx={{ mb: 2, fontSize: '0.9rem' }}
              >
                {message}
              </Typography>
            )}
            <TextField
              label="Organization Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              sx={{
                mb: 3,
                borderRadius: '8px',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
                backgroundColor: '#ffffff',
              }}
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleApply}
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
              Submit Application
            </Button>
          </CardContent>
        </Card>
      </Box>
    </PageWrapper>
  );
}

export default Organizations;
