import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import api from '../utils/api';

const StyledCard = styled(Card)`
  box-shadow: 3;
  border-radius: 12px;
  transition: box-shadow 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.12);
  }
`;

function Stories({ organizationId }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      if (!organizationId) return;

      try {
        const response = await api.get(`/organization/${organizationId}/stories`);
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [organizationId]);

  return (
    <PageWrapper>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1565C0', mb: 4 }}>
        Beneficiary Stories
      </Typography>
      {loading ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>Loading stories...</Typography>
      ) : (
        <Grid container spacing={3}>
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
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565C0' }}>
                        {story.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {story.content}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'gray' }}>
                        Posted on: {new Date(story.date_posted).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
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
