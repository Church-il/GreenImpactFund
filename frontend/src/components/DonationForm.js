import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useSelector } from 'react-redux';

function DonationForm({ organizationId }) {
  const [amount, setAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token); // Get the JWT token from Redux

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/donations',
        {
          amount: parseFloat(amount),
          recurring,
          organization_id: organizationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Donation successful! Thank you.');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          p: 4,
          maxWidth: 400,
          mx: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Make a Donation
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
          label="Donation Amount (KES)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          type="number"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
            />
          }
          label="Make this a monthly donation"
        />
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ marginTop: '16px' }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={handleDonate}
            disabled={loading}
            sx={{
              backgroundColor: '#1E88E5',
              '&:hover': { backgroundColor: '#1565C0' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Donate Now'}
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default DonationForm;
