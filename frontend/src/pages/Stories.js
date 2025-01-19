import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/stories');
        setStories(response.data.stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    }

    fetchStories();
  }, []);

  return (
    <PageWrapper>
      <Typography variant="h4" gutterBottom>
        Beneficiary Stories
      </Typography>
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
                <Card>
                  <CardContent>
                    <Typography variant="h6">{story.title}</Typography>
                    <Typography variant="body2">{story.content}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2 }}>
                      Posted on: {new Date(story.date_posted).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No stories available at the moment.
          </Typography>
        )}
      </Grid>
    </PageWrapper>
  );
}

export default Stories;
