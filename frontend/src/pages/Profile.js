import api from '../utils/api'; 
import React, { useState } from 'react';
import {
  TextField, Button, Typography, Container, Grid, IconButton,
  InputAdornment, LinearProgress, Switch, FormControlLabel,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  List, ListItem, ListItemText, Divider, Box, Tabs, Tab, Avatar,
  FormControl, InputLabel, Select, MenuItem, Collapse
} from '@mui/material';
import {
  Edit, Save, Logout, Delete, Security, CloudDownload, ExpandMore,
  ExpandLess, Cake, Work, Link, Visibility, VisibilityOff, Transgender, Lock
} from '@mui/icons-material';
import { colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: 'Current',
    lastName: 'User',
    username: '@currentuser',
    phone: '+1234567890',
    address: 'Nairobi, Kenya',
    bio: 'Digital Creator',
    gender: 'male/female',
    dateOfBirth: '1990-01-01',
    occupation: 'Software Developer',
    website: 'https://portfolio.currentuser.com',
    password: '',
    confirmPassword: '',
    darkMode: false,
    twoFactorAuth: false,
    language: 'en',
    profileVisibility: 'public',
    linkedin: '',
    github: ''
  });

  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ success: null, message: '' });
  const navigate = useNavigate();

  const themeColors = [
    colors.blue[700], colors.red[700], colors.green[700],
    colors.purple[700], colors.orange[700]
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleColorChange = (color) => {
    setUser(prev => ({ ...prev, themeColor: color }));
    document.documentElement.style.setProperty('--primary-color', color);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await api.put('/api/user/profile', user); //api instance
      setSaveStatus({ success: true, message: 'Changes saved successfully!' });
      setTimeout(() => setSaveStatus({ success: null, message: '' }), 3000);
    } catch (error) {
      setSaveStatus({ success: false, message: 'Error saving changes' });
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  const handleExportData = async () => {
    const response = await api.get('/api/user/export'); //api instance
    const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data.json';
    a.click();
  };

  return (
    <Container maxWidth="xl" sx={{
      height: '92.99vh',
      py: 4,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      transition: 'all 0.3s ease'
    }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <Box sx={{
            p: 2,
            height: '100%',
            borderRadius: '20px',
            background: 'linear-gradient(145deg, #2c3e50, #3498db)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar sx={{
                width: 80,
                height: 80,
                mb: 2,
                border: 2px solid ${user.themeColor},
                background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)'
              }}/>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {user.username}
              </Typography>
            </Box>

            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: '8px',
                  margin: '4px 0',
                  '&.Mui-selected': {
                    color: 'white',
                    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }
              }}
            >
              <Tab label="Profile" icon={<Edit sx={{ color: 'inherit' }} />} />
              <Tab label="Security" icon={<Security sx={{ color: 'inherit' }} />} />
              <Tab label="Advanced" icon={<ExpandMore sx={{ color: 'inherit' }} />} />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Box sx={{
            p: 3,
            height: '95%',
            borderRadius: '20px',
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            '&:hover': { overflowY: 'auto' },
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            }
          }}>
            {activeTab === 0 && (
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  mb: 3,
                  background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)',
                  p: 2,
                  borderRadius: '12px'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Profile Settings</Typography>
                  <Button
                    variant="contained"
                    onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
                    startIcon={editMode ? <Save /> : <Edit />}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  >
                    {editMode ? 'Save Profile' : 'Edit Profile'}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {[
                    { field: 'firstName', label: 'First Name' },
                    { field: 'lastName', label: 'Last Name' },
                    { field: 'username', label: 'Username' },
                    { field: 'phone', label: 'Phone' },
                    { field: 'dateOfBirth', label: 'Birth Date', type: 'date' },
                    { field: 'occupation', label: 'Occupation' },
                    { field: 'website', label: 'Website', type: 'url' },
                    { field: 'linkedin', label: 'LinkedIn', type: 'url' },
                    { field: 'github', label: 'GitHub', type: 'url' },
                  ].map(({ field, label, type }) => (
                    <Grid item xs={6} key={field}>
                      <TextField
                        fullWidth
                        label={label}
                        name={field}
                        type={type || 'text'}
                        value={user[field]}
                        onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: field === 'dateOfBirth' && (
                            <InputAdornment position="start">
                              <Cake />
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            background: 'rgba(245, 245, 245, 0.4)'
                          }
                        }}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={user.gender}
                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                        label="Gender"
                        disabled={!editMode}
                        startAdornment={
                          <InputAdornment position="start">
                            <Transgender />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Profile Visibility</InputLabel>
                      <Select
                        value={user.profileVisibility}
                        onChange={(e) => setUser({ ...user, profileVisibility: e.target.value })}
                        label="Profile Visibility"
                        disabled={!editMode}
                        startAdornment={
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="public">Public</MenuItem>
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="friends-only">Friends Only</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      multiline
                      rows={4}
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      disabled={!editMode}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          background: 'rgba(245, 245, 245, 0.4)'
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Security</Typography>
                <List sx={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', p: 1 }}>
                  <ListItem sx={{ borderRadius: '8px' }}>
                    <FormControlLabel
                      control={<Switch checked={user.twoFactorAuth} onChange={(e) => setUser({ ...user, twoFactorAuth: e.target.checked })} />}
                      label="Two-Factor Authentication"
                    />
                  </ListItem>
                  <ListItem sx={{ borderRadius: '8px' }}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </ListItem>
                </List>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Advanced</Typography>
                <List sx={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', p: 1 }}>
                  <ListItem 
                    button 
                    onClick={() => handleSectionToggle('data')}
                    sx={{ borderRadius: '8px' }}
                  >
                    <ListItemText primary="Data Management" />
                    {expandedSection === 'data' ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={expandedSection === 'data'}>
                    <ListItem>
                      <Button
                        variant="outlined"
                        startIcon={<CloudDownload />}
                        onClick={handleExportData}
                        sx={{
                          borderColor: '#2196f3',
                          color: '#2196f3',
                          '&:hover': { background: 'rgba(33, 150, 243, 0.1)' }
                        }}
                      >
                        Export All Data
                      </Button>
                    </ListItem>
                  </Collapse>
                </List>
              </Box>
            )}

            {saveStatus.message && (
              <Box sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                p: 2,
                borderRadius: '8px',
                background: saveStatus.success 
                  ? 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)' 
                  : 'linear-gradient(45deg, #ff5252 30%, #ff867f 90%)',
                color: 'white',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {saveStatus.message}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;