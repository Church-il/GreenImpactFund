import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { AccountCircle, Favorite, History, Settings } from '@mui/icons-material';

function Dashboard() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 50); // Delay for smooth transition
  }, []);

  const features = [
    {
      title: 'Manage Profile',
      description: 'Update your personal details and preferences.',
      icon: <AccountCircle sx={{ fontSize: 40, color: '#42a5f5' }} />,
      link: '/profile',
    },
    {
      title: 'Your Donations',
      description: 'View and track your donation history.',
      icon: <Favorite sx={{ fontSize: 40, color: '#ef5350' }} />,
      link: '/donations',
    },
    {
      title: 'Donation History',
      description: 'Check past contributions and manage receipts.',
      icon: <History sx={{ fontSize: 40, color: '#66bb6a' }} />,
      link: '/history',
    },
    {
      title: 'Settings',
      description: 'Customize your account preferences.',
      icon: <Settings sx={{ fontSize: 40, color: '#ffa726' }} />,
      link: '/settings',
    },
  ];

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd, #fce4ec)',
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, color: '#1e88e5' }}
      >
        Welcome to Your Dashboard!
      </Typography>
      <Typography
        sx={{ textAlign: 'center', mb: 5, fontSize: '1.2rem', color: '#616161' }}
      >
        Manage your donations, profile, and settings from here.
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {feature.icon}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', mt: 2, color: '#424242' }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#757575', mt: 1 }}>
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 3,
                    borderRadius: '20px',
                    backgroundColor: '#42a5f5',
                    '&:hover': {
                      backgroundColor: '#1e88e5',
                    },
                  }}
                  href={feature.link}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
