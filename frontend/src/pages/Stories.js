import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import api from '../utils/api';

const StyledCard = styled(Card)`
  box-shadow: 3;
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StoryImage = styled(CardMedia)`
  height: 220px;
  object-fit: cover;
`;

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await api.get('/stories');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, []);

  return (
    <PageWrapper>
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', mb: 4 }}>
        Inspiring Impact Stories
      </Typography>
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading stories...</Typography>
      ) : (
        <Grid container spacing={4}>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <Grid item xs={12} sm={6} md={4} key={story.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StyledCard>
                    <StoryImage image={story.imageUrl} title={story.title} />
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                        {story.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {story.content.substring(0, 150)}...
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'gray' }}>
                        Published on: {new Date(story.date_posted).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
                No stories available at the moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </PageWrapper>
  );
}

export default Stories;
