import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CardMedia, Container } from '@mui/material';
import axios from 'axios';
import PageWrapper from '../components/PageWrapper';

function Home() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/organizations');
        setOrganizations(response.data.organizations);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    }

    fetchOrganizations();
  }, []);

  return (
    <PageWrapper>
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          px: 2,
          background: 'linear-gradient(135deg, #81c784, #66bb6a)',
          color: 'white',
          borderRadius: 4,
          mb: 5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Together for the Planet
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', mb: 4, lineHeight: 1.8 }}>
          Support impactful organizations making a difference in protecting the environment. 
          Your contributions help preserve ecosystems, combat climate change, and build a 
          sustainable future for generations to come. Let’s take a stand for the planet—one donation at a time.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#2e7d32',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1rem',
            borderRadius: '30px',
            '&:hover': { backgroundColor: '#1b5e20' },
          }}
        >
          Learn How Donations Help
        </Button>
      </Box>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#2e7d32' }}
        >
          Explore Environmental Organizations
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 5, lineHeight: 1.8 }}
        >
          Discover organizations dedicated to restoring forests, conserving wildlife, 
          reducing carbon emissions, and more. Every cause matters—find one that resonates with you and start contributing to a greener tomorrow.
        </Typography>
        <Grid container spacing={4}>
          {organizations.map((org) => (
            <Grid item xs={12} sm={6} md={4} key={org.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: 4,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  },
                }}
              >
                {org.image && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={org.image}
                    alt={`${org.name} logo`}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}
                  >
                    {org.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#616161', mb: 2, fontStyle: 'italic' }}
                  >
                    {org.description.length > 100
                      ? `${org.description.substring(0, 100)}...`
                      : org.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 'auto',
                      borderRadius: 20,
                      padding: '8px 16px',
                      backgroundColor: '#66bb6a',
                      '&:hover': { backgroundColor: '#388e3c' },
                    }}
                    onClick={() => window.location.href = `/donate/${org.id}`}
                  >
                    Donate Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Home;
