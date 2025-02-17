import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  CircularProgress, 
  Container, 
  TextField, 
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { Close, Favorite, Share } from '@mui/icons-material';
import PageWrapper from '../components/PageWrapper';
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(10).max(100),
  content: yup.string().required('Content is required').min(50).max(1000),
  image: yup.mixed().required('Image is required')
});

const StyledCard = styled(Card)`
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }
`;

const StoryImage = styled(CardMedia)`
  height: 300px;
  object-fit: cover;
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  }
`;

function Stories() {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: yupResolver(schema)
  });
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('/stories');
        setStories(response.data);
      } catch (err) {
        setError('Failed to load stories');
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setValue('image', file);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('image', data.image);

      const response = await api.post('/stories', formData);
      setStories([response.data.story, ...stories]);
      reset();
      setSnackbar({ open: true, message: 'Story shared successfully!' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error sharing story' });
    }
  };

  const deleteStory = async (id) => {
    try {
      await api.delete(`/stories/${id}`);
      setStories(stories.filter(story => story.id !== id));
      setSnackbar({ open: true, message: 'Story deleted successfully!' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting story' });
    }
  };

  return (
    <PageWrapper>
      <Container maxWidth="xl">
        <Typography variant="h2" sx={{ 
          fontWeight: 800, 
          color: 'primary.main', 
          textAlign: 'center', 
          mb: 6,
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          Community Impact Stories
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '3rem' }}>
          <TextField
            {...register('title')}
            label="Story Title"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('content')}
            label="Your Story"
            multiline
            rows={4}
            fullWidth
            error={!!errors.content}
            helperText={errors.content?.message}
            sx={{ mb: 2 }}
          />
          <input
            {...register('image')}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="story-image-upload"
          />
          <label htmlFor="story-image-upload">
            <Button 
              variant="outlined" 
              component="span"
              color={errors.image ? 'error' : 'primary'}
              sx={{ mb: 2, mr: 2 }}
            >
              Upload Image
            </Button>
          </label>
          {errors.image && <Typography color="error">{errors.image.message}</Typography>}
          <Button type="submit" variant="contained" size="large">
            Share Your Story
          </Button>
        </form>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {stories.map((story, index) => (
              <Grid item xs={12} sm={6} md={4} key={story.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <StyledCard>
                    <IconButton 
                      sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }} 
                      onClick={() => deleteStory(story.id)}
                    >
                      <Close color="error" />
                    </IconButton>
                    
                    <StoryImage
                      image={story.imageUrl}
                      title={story.title}
                      onClick={() => setSelectedStory(story)}
                    />
                    
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        {story.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {story.content.substring(0, 150)}...
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                          variant="text" 
                          startIcon={<Favorite />}
                          onClick={() => setSelectedStory(story)}
                        >
                          {story.likes || 0}
                        </Button>
                        <Button 
                          variant="outlined" 
                          onClick={() => setSelectedStory(story)}
                        >
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog 
          open={!!selectedStory} 
          onClose={() => setSelectedStory(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            {selectedStory && (
              <>
                <StoryImage image={selectedStory.imageUrl} title={selectedStory.title} />
                <CardContent>
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                    {selectedStory.title}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                    {selectedStory.content}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <IconButton>
                        <Favorite />
                        <Typography>{selectedStory.likes || 0}</Typography>
                      </IconButton>
                      <IconButton>
                        <Share />
                      </IconButton>
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      Posted on: {new Date(selectedStory.date_posted).toLocaleDateString()}
                    </Typography>
                  </div>
                </CardContent>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setSnackbar({ ...snackbar, open: false })}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </PageWrapper>
  );
}

export default Stories;