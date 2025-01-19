import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

function Organizations() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const token = useSelector((state) => state.auth.token); // Get user token

  const handleApply = async () => {
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
      setMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <PageWrapper>
      <Box sx={{ maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Apply as an Organization
        </Typography>
        {message && (
          <Typography color="primary" sx={{ mb: 2 }}>
            {message}
          </Typography>
        )}
        <TextField
          label="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
        <Button variant="contained" fullWidth onClick={handleApply}>
          Submit Application
        </Button>
      </Box>
    </PageWrapper>
  );
}

export default Organizations;
