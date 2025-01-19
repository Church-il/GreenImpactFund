import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Login, PersonAdd, Dashboard } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(90deg, #1E88E5, #4CAF50, #00BCD4)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '1px',
          }}
          onClick={() => navigate('/')}
        >
          Green Impact Fund
        </Typography>
        <Box>
          <Button
            color="inherit"
            sx={{
              marginRight: 2,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#388e3c',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/login')}
            startIcon={<Login />}
          >
            Login
          </Button>
          <Button
            color="inherit"
            sx={{
              marginRight: 2,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#388e3c',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/signup')}
            startIcon={<PersonAdd />}
          >
            Sign Up
          </Button>
          <Button
            color="inherit"
            sx={{
              marginRight: 2,
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#388e3c',
                color: '#fff',
              },
            }}
            onClick={() => navigate('/dashboard')}
            startIcon={<Dashboard />}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
