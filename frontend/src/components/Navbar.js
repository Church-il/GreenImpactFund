import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Login, PersonAdd, Dashboard, ExitToApp } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(90deg,rgb(19, 181, 24),rgb(5, 194, 198),rgb(12, 69, 225))',
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
            letterSpacing: '0px',
            fontStyle: 'italic',
          }}
          onClick={() => navigate('/')}
        >
          Mazingira - Green Impact Fund
        </Typography>
        <Box>
          {!isAuthenticated ? (
            <>
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
            </>
          ) : (
            <>
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
              <Button
                color="inherit"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                    color: '#fff',
                  },
                }}
                onClick={handleLogout}
                startIcon={<ExitToApp />}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
