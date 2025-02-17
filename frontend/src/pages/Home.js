import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '@mui/material/Skeleton';
import { Grid, Chip, IconButton } from '@mui/material';
import { Favorite, Share, ArrowForward } from '@mui/icons-material';

const API_URL = process.env.REACT_APP_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const HeroSection = styled.section`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #00695c, #2e7d32);
  color: white;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: white;
    transform: skewY(-3deg);
    z-index: 1;
  }
`;

const AnimatedTitle = styled(motion.h1)`
  font-weight: 800;
  margin-bottom: 20px;
  font-size: 2.8rem;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const SubText = styled(motion.p)`
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.8;
  font-size: 1.2rem;
  opacity: 0.9;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const OrganizationCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  }
`;

const OrganizationImage = styled.div`
  height: 200px;
  position: relative;
  background: ${props => props.bg || '#f5f5f5'};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(transparent, rgba(0,0,0,0.5));
  }
`;

const OrganizationContent = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const OrgName = styled.h3`
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 12px;
  font-size: 1.4rem;
`;

const OrgDescription = styled.p`
  color: #616161;
  margin-bottom: 20px;
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.6;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${API_URL}/organizations`);
        setOrganizations(response.data.organizations);
        setError(null);
      } catch (err) {
        setError('Failed to load organizations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, [isAuthenticated, navigate]);

  const toggleFavorite = (orgId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(orgId) ? newFavorites.delete(orgId) : newFavorites.add(orgId);
      return newFavorites;
    });
  };

  if (!isAuthenticated) return null;

  return (
    <PageWrapper>
      <HeroSection>
        <AnimatedTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Collective Action for a Greener Future
        </AnimatedTitle>
        <SubText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join thousands of eco-champions supporting verified environmental initiatives. 
          From reforestation to clean energy, your contribution creates measurable impact 
          where it's needed most.
        </SubText>
      </HeroSection>

      <SectionHeader>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Featured Environmental Organizations
        </h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', color: '#616161' }}>
          Discover and support organizations making tangible impacts across key sustainability areas
        </p>
      </SectionHeader>

      <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <AnimatePresence>
          {isLoading ? (
            Array(6).fill().map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          ) : error ? (
            <Grid item xs={12}>
              <div style={{ textAlign: 'center', color: '#d32f2f', padding: '20px' }}>
                {error}
              </div>
            </Grid>
          ) : (
            organizations.map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org.id}>
                <OrganizationCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <OrganizationImage bg={org.image ? 'none' : '#e8f5e9'}>
                    {org.image && <img src={org.image} alt={org.name} loading="lazy" />}
                    <Chip 
                      label={org.category} 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16, 
                        fontWeight: 600,
                        background: 'rgba(255,255,255,0.9)'
                      }}
                    />
                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8, color: favorites.has(org.id) ? '#d32f2f' : 'white' }}
                      onClick={() => toggleFavorite(org.id)}
                    >
                      <Favorite />
                    </IconButton>
                  </OrganizationImage>
                  
                  <OrganizationContent>
                    <OrgName>{org.name}</OrgName>
                    <OrgDescription>{org.description}</OrgDescription>
                    
                    <ActionBar>
                      <IconButton onClick={() => navigator.share({ url: window.location.href })}>
                        <Share />
                      </IconButton>
                      <button 
                        onClick={() => navigate(`/donate/${org.id}`)}
                        style={{
                          background: '#2e7d32',
                          color: 'white',
                          padding: '8px 20px',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        Support Now
                        <ArrowForward fontSize="small" />
                      </button>
                    </ActionBar>
                  </OrganizationContent>
                </OrganizationCard>
              </Grid>
            ))
          )}
        </AnimatePresence>
      </Grid>
    </PageWrapper>
  );
};

export default Home;