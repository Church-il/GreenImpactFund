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
  Snackbar,
  Pagination
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { Close, Favorite, Share, Edit, Delete } from '@mui/icons-material';
import PageWrapper from '../components/PageWrapper';
import api from '../utils/api';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import StorySkeleton from '../components/StorySkeleton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required().min(10).max(100),
  content: yup.string().required().min(50).max(1000),
  image: yup.mixed().required()
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

const StoryActions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const StoryDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 16px;
    max-width: 800px;
    background: linear-gradient(145deg, #ffffff, #f8f9fa);
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { loadMoreRef } = useInfiniteScroll(loadMoreStories);

  const fetchStories = async () => {
    try {
      const response = await api.get(`/stories?page=${page}&filter=${filter}&sort=${sort}`);
      setStories(response.data.stories);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  async function loadMoreStories() {
    if (page < totalPages) {
      setPage(p => p + 1);
      const response = await api.get(`/stories?page=${page + 1}&filter=${filter}&sort=${sort}`);
      setStories(prev => [...prev, ...response.data.stories]);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('image', data.image);

      const response = await api.post('/stories', formData);
      setStories(prev => [response.data.story, ...prev]);
      reset();
      setSnackbar({ open: true, message: 'Story created successfully!' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error creating story' });
    }
  };

  const deleteStory = async (id) => {
    try {
      await api.delete(`/stories/${id}`);
      setStories(prev => prev.filter(story => story.id !== id));
      setSnackbar({ open: true, message: 'Story deleted successfully!' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting story' });
    }
  };

  useEffect(() => {
    fetchStories();
  }, [filter, sort, page]);

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

        <FilterBar>
          <Chip
            label="All Stories"
            color={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
          />
          <Chip
            label="My Stories"
            color={filter === 'my' ? 'primary' : 'default'}
            onClick={() => setFilter('my')}
          />
          <Chip
            label="Most Liked"
            color={sort === 'likes' ? 'primary' : 'default'}
            onClick={() => setSort('likes')}
          />
          <Chip
            label="Newest First"
            color={sort === 'newest' ? 'primary' : 'default'}
            onClick={() => setSort('newest')}
          />
        </FilterBar>

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
          <Grid container spacing={4}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <StorySkeleton />
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              <AnimatePresence>
                {stories.map((story, index) => (
                  <Grid item xs={12} sm={6} md={4} key={story.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StyledCard>
                        <StoryActions>
                          <IconButton onClick={() => deleteStory(story.id)}>
                            <Delete color="error" />
                          </IconButton>
                          <IconButton>
                            <Edit color="primary" />
                          </IconButton>
                        </StoryActions>
                        
                        {story.imageUrl && (
                          <StoryImage
                            image={story.imageUrl}
                            title={story.title}
                            onClick={() => setSelectedStory(story)}
                          />
                        )}
                        
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
                              onClick={() => setSelectedStory(story)}
                              endIcon={<Favorite />}
                            >
                              {story.likes}
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
              </AnimatePresence>
            </Grid>

            <div ref={loadMoreRef} style={{ height: '20px', margin: '20px 0' }} />
          </>
        )}

        <StoryDialog open={!!selectedStory} onClose={() => setSelectedStory(null)}>
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
                        <Typography>{selectedStory.likes}</Typography>
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
        </StoryDialog>

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