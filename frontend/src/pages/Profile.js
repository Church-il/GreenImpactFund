import api from '../utils/api'; 
import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Typography, Container, Grid, IconButton,
  InputAdornment, LinearProgress, Switch, FormControlLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  List, ListItem, ListItemText, Divider, Box, Tabs, Tab, Avatar,
  FormControl, InputLabel, Select, MenuItem, Collapse, Alert
} from '@mui/material';
import {
  Edit, Save, Logout, Delete, Security, CloudDownload, ExpandMore,
  ExpandLess, Cake, Work, Link, Visibility, VisibilityOff, 
  Transgender, Lock, PhotoCamera, VerifiedUser
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';

// Validation Schema
const profileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').max(50),
  lastName: yup.string().required('Last name is required').max(50),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  bio: yup.string().max(500, 'Bio cannot exceed 500 characters'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 
      'Password must contain uppercase, lowercase, and number'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Profile = () => {
  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch
  } = useForm({
    resolver: yupResolver(profileSchema)
  });
  
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [twoFactorStep, setTwoFactorStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/user/profile');
        setUser(response.data);
        reset(response.data);
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await api.patch('/api/user/avatar', formData);
      setUser(prev => ({ ...prev, avatar: response.data.avatar }));
      toast.success('Profile image updated');
    } catch (error) {
      toast.error('Image upload failed');
    }
  };

  const handleSaveChanges = async (data) => {
    try {
      const response = await api.put('/api/user/profile', data);
      setUser(response.data);
      reset(response.data);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (data) => {
    try {
      await api.post('/api/user/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Password change failed');
    }
  };

  const handleTwoFactorAuth = async () => {
    try {
      if (!user.twoFactorEnabled) {
        const response = await api.post('/api/user/2fa/enable');
        setTwoFactorStep(1);
        toast.info('Check your email for verification code');
      } else {
        await api.post('/api/user/2fa/disable');
        setUser(prev => ({ ...prev, twoFactorEnabled: false }));
        toast.success('Two-factor authentication disabled');
      }
    } catch (error) {
      toast.error('Two-factor operation failed');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await api.post('/api/user/2fa/verify', { code: verificationCode });
      setUser(prev => ({ ...prev, twoFactorEnabled: true }));
      setTwoFactorStep(0);
      toast.success('Two-factor authentication enabled');
    } catch (error) {
      toast.error('Invalid verification code');
    }
  };

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleExportData = async () => {
    try {
      const response = await api.get('/api/user/export');
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user-data.json';
      a.click();
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleAccountDelete = async () => {
    try {
      await api.delete('/api/user');
      localStorage.clear();
      navigate('/login');
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error('Account deletion failed');
    }
  };

  if (loading) return <LinearProgress />;

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Box sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: 3,
            textAlign: 'center'
          }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar
                src={user?.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '3px solid',
                  borderColor: 'primary.main'
                }}
              />
              {editMode && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'background.paper'
                  }}
                  component="label"
                >
                  <PhotoCamera />
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                </IconButton>
              )}
            </Box>

            <Typography variant="h6" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.title || 'Member'}
            </Typography>

            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ mt: 3 }}
            >
              <Tab label="Profile" icon={<Edit />} />
              <Tab label="Security" icon={<Security />} />
              <Tab label="Advanced" icon={<ExpandMore />} />
            </Tabs>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: 3
          }}>
            {/* Profile Tab */}
            {activeTab === 0 && (
              <form onSubmit={handleSubmit(handleSaveChanges)}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h5">Profile Settings</Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(!editMode)}
                      sx={{ mr: 2 }}
                    >
                      {editMode ? 'Cancel' : 'Edit Profile'}
                    </Button>
                    {editMode && (
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    )}
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                    <Grid item xs={12} sm={6} key={field}>
                      <Controller
                        name={field}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            disabled={!editMode}
                            error={!!errors[field]}
                            helperText={errors[field]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Controller
                      name="bio"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          rows={4}
                          label="Bio"
                          disabled={!editMode}
                          error={!!errors.bio}
                          helperText={errors.bio?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </form>
            )}

            {/* Security Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom>Security Settings</Typography>
                
                <List sx={{ mb: 3 }}>
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={user?.twoFactorEnabled}
                          onChange={handleTwoFactorAuth}
                        />
                      }
                      label="Two-Factor Authentication"
                      labelPlacement="start"
                      sx={{ width: '100%', justifyContent: 'space-between' }}
                    />
                  </ListItem>

                  {twoFactorStep === 1 && (
                    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <TextField
                        fullWidth
                        label="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <Button 
                              onClick={handleVerifyCode}
                              variant="contained"
                            >
                              Verify
                            </Button>
                          )
                        }}
                      />
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <form onSubmit={handleSubmit(handlePasswordChange)}>
                    <Typography variant="h6" gutterBottom>Change Password</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="currentPassword"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type="password"
                              label="Current Password"
                              error={!!errors.currentPassword}
                              helperText={errors.currentPassword?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="newPassword"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              type="password"
                              label="New Password"
                              error={!!errors.newPassword}
                              helperText={errors.newPassword?.message}
                            />
                          )}
                        />
                        <PasswordStrengthBar password={watch('newPassword')} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                          Change Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </List>
              </Box>
            )}

            {/* Advanced Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h5" gutterBottom>Advanced Settings</Typography>
                
                <List>
                  <ListItem button onClick={() => handleSectionToggle('data')}>
                    <ListItemText primary="Data Management" />
                    {expandedSection === 'data' ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={expandedSection === 'data'}>
                    <Box sx={{ p: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<CloudDownload />}
                        onClick={handleExportData}
                      >
                        Export Data
                      </Button>
                    </Box>
                  </Collapse>

                  <ListItem button onClick={() => setOpenDeleteDialog(true)}>
                    <ListItemText 
                      primary="Delete Account" 
                      secondary="Permanently remove your account and all data"
                    />
                    <Delete color="error" />
                  </ListItem>
                </List>

                <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                  <DialogTitle>Confirm Account Deletion</DialogTitle>
                  <DialogContent>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      This action cannot be undone!
                    </Alert>
                    <TextField
                      fullWidth
                      label="Type 'DELETE' to confirm"
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button 
                      color="error"
                      disabled={deleteConfirmation !== 'DELETE'}
                      onClick={handleAccountDelete}
                    >
                      Delete Permanently
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;