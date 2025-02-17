import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Login, PersonAdd, Dashboard, ExitToApp, Favorite, Book } from '@mui/icons-material';
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
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #0D47A1, #1976D2, #42A5F5)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        padding: '6px 0',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '1px',
            fontStyle: 'italic',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
              color: '#ffeb3b',
            },
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
                    backgroundColor: '#2E7D32',
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
                    backgroundColor: '#2E7D32',
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
                    backgroundColor: '#2E7D32',
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
                  marginRight: 2,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#FF5722',
                    color: '#fff',
                  },
                }}
                onClick={() => navigate('/donations')}
                startIcon={<Favorite />}
              >
                Donations
              </Button>
              <Button
                color="inherit"
                sx={{
                  marginRight: 2,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#673AB7',
                    color: '#fff',
                  },
                }}
                onClick={() => navigate('/stories')}
                startIcon={<Book />}
              >
                Stories
              </Button>
              <Button
                color="inherit"
                sx={{
                  marginRight: 2,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#f2bf16',
                    color: '#fff',
                  },
                }}
                onClick={() => navigate('/donation-impact')}
                startIcon={<Favorite />}
              >
                Impact
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#D32F2F',
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
