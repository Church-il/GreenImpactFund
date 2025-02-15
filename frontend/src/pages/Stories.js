import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, CircularProgress, Container, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import api from '../utils/api';

const StyledCard = styled(Card)`
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const StoryImage = styled(CardMedia)`
  height: 250px;
  object-fit: cover;
`;

function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await api.post('/stories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStories([response.data.story, ...stories]);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', mb: 4 }}>
          Inspiring Impact Stories
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth sx={{ mb: 2 }} />
          <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} required multiline rows={4} fullWidth sx={{ mb: 2 }} />
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '1rem' }} />
          <Button type="submit" variant="contained" color="primary">Create Story</Button>
        </form>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
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
                      {story.imageUrl && <StoryImage image={story.imageUrl} title={story.title} />}
                      <CardContent>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                          {story.title}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {story.content.length > 150 ? story.content.substring(0, 150) + '...' : story.content}
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
      </Container>
    </PageWrapper>
  );
}

export default Stories;
