import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';
import { 
  Grid, 
  TextField, 
  Chip, 
  IconButton, 
  Alert, 
  Snackbar, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { Search, FilterList, Favorite } from '@mui/icons-material';

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

const Title = styled(motion.h1)`
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

const ControlBar = styled.div`
  display: flex;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
  flex-wrap: wrap;
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

const CategoryChip = styled(Chip)`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  font-weight: 600;
  background: rgba(255,255,255,0.9);
`;

const Home = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const [orgsResponse, catsResponse] = await Promise.all([
          axios.get(`${API_URL}/organizations?page=${page}`),
          axios.get(`${API_URL}/categories`)
        ]);
        
        setOrganizations(prev => [...prev, ...orgsResponse.data.organizations]);
        setCategories(catsResponse.data.categories);
        setHasMore(orgsResponse.data.hasMore);
        setError(null);
      } catch (err) {
        setError('Failed to load organizations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
  };

  const toggleFavorite = (orgId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(orgId) ? newFavorites.delete(orgId) : newFavorites.add(orgId);
      return newFavorites;
    });
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery) ||
      org.description.toLowerCase().includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || org.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) return null;

  return (
    <PageWrapper>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Collective Action for a Greener Future
        </Title>
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

      <ControlBar>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search organizations..."
          InputProps={{
            startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />
          }}
          onChange={handleSearch}
          sx={{ flex: 1 }}
        />
        
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlBar>

      {error && (
        <Alert severity="error" sx={{ maxWidth: 1200, margin: '0 auto 40px' }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <AnimatePresence>
          {isLoading ? (
            Array(6).fill().map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton variant="text" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))
          ) : (
            filteredOrganizations.map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org.id}>
                <OrganizationCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <OrganizationImage bg={org.image ? 'none' : '#e8f5e9'}>
                    {org.image && <img src={org.image} alt={org.name} loading="lazy" />}
                    <CategoryChip label={org.category} size="small" />
                    <IconButton
                      sx={{ position: 'absolute', top: 8, right: 8, color: favorites.has(org.id) ? 'error.main' : 'white' }}
                      onClick={() => toggleFavorite(org.id)}
                    >
                      <Favorite />
                    </IconButton>
                  </OrganizationImage>
                  
                  <OrganizationContent>
                    <OrgName>{org.name}</OrgName>
                    <OrgDescription>{org.description}</OrgDescription>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', gap: 10 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/donate/${org.id}`)}
                      >
                        Support Now
                      </Button>
                    </div>
                  </OrganizationContent>
                </OrganizationCard>
              </Grid>
            ))
          )}
        </AnimatePresence>
      </Grid>

      {hasMore && !isLoading && (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => setPage(prev => prev + 1)}
            disabled={isLoading}
          >
            Load More Organizations
          </Button>
        </div>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </PageWrapper>
  );
};

export default Home;