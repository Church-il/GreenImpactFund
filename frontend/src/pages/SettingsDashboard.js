import api from '../utils/api;'
import React, { useState } from 'react';
import {
  Box, Container, Grid, Typography, TextField, Button,
  Switch, FormControlLabel, Avatar, IconButton, Divider,
  List, ListItem, ListItemText, Collapse, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Chip, Alert
} from '@mui/material';
import {
  Edit, Save, Lock, Email, Notifications, Palette,
  Visibility, VisibilityOff, CloudDownload, Delete,
  ExpandMore, ExpandLess, Security, Language, DarkMode
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const SettingsDashboard = ({ currentUser }) => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    profile: {
      name: currentUser?.name || 'Current User',
      email: currentUser?.email || 'currentuser@example.com',
      avatar: currentUser?.avatar || '',
      bio: currentUser?.bio || 'Digital Creator & Developer',
      language: 'en',
      timezone: 'UTC-05:00'
    },
    security: {
      twoFactor: false,
      password: '',
      connectedDevices: ['iPhone 13', 'MacBook Pro']
    },
    preferences: {
      darkMode: false,
      themeColor: theme.palette.primary.main,
      notifications: {
        email: true,
        push: true,
        monthlyReport: false
      }
    }
  });

  const [expanded, setExpanded] = useState({
    profile: true,
    security: false,
    appearance: false,
    notifications: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const themeColors = [
    '#6a11cb', '#2575fc', '#2cccff', '#25d366', '#ff6b6b'
  ];

  const handleSectionToggle = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSettingChange = (path, value) => {
    setSettings(prev => ({
      ...prev,
      [path.split('.')[0]]: {
        ...prev[path.split('.')[0]],
        [path.split('.')[1]]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      await api.put('/api/user/settings', settings);
      setFeedback({ type: 'success', message: 'Settings saved successfully!' });
      setEditMode(false);
    } catch (error) {
      setFeedback({ type: 'error', message: 'Failed to save settings' });
    }
  };
  
  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      background: settings.preferences.darkMode 
        ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' 
        : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <Grid container spacing={4}>
        {/* Left Navigation */}
        <Grid item xs={12} md={3}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Box sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(145deg, #6a11cb 0%, #2575fc 100%)',
              boxShadow: 3,
              color: 'white',
              height: '100%'
            }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 100, 
                  height: 100, 
                  mb: 2,
                  bgcolor: settings.preferences.themeColor,
                  fontSize: '2.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  {settings.profile.name[0]}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {settings.profile.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {settings.profile.email}
                </Typography>
              </Box>

              <List component="nav">
                {Object.keys(expanded).map((section) => (
                  <ListItem 
                    button 
                    key={section}
                    onClick={() => handleSectionToggle(section)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      transition: 'all 0.2s',
                      bgcolor: expanded[section] ? 'rgba(255,255,255,0.15)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={section.charAt(0).toUpperCase() + section.slice(1)} 
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    {expanded[section] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                ))}
              </List>
            </Box>
          </motion.div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{
              p: 4,
              borderRadius: 4,
              background: settings.preferences.darkMode 
                ? 'linear-gradient(145deg, rgba(21,21,21,0.95) 0%, rgba(40,40,40,0.95) 100%)'
                : 'linear-gradient(145deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.95) 100%)',
              boxShadow: 3,
              backdropFilter: 'blur(20px)',
              border: settings.preferences.darkMode 
                ? '1px solid rgba(255,255,255,0.1)' 
                : '1px solid rgba(0,0,0,0.05)'
            }}>
              {/* Feedback Alert */}
              {feedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert 
                    severity={feedback.type} 
                    sx={{ 
                      mb: 3,
                      background: feedback.type === 'success' 
                        ? 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)' 
                        : 'linear-gradient(90deg, #ff5252 0%, #ff4444 100%)',
                      color: 'white'
                    }}
                    onClose={() => setFeedback({ type: '', message: '' })}
                  >
                    {feedback.message}
                  </Alert>
                </motion.div>
              )}

              {/* Profile Section */}
              <Collapse in={expanded.profile}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                  }}>
                    <Edit sx={{ mr: 1 }} /> Profile Settings
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={settings.profile.name}
                        onChange={(e) => handleSettingChange('profile.name', e.target.value)}
                        InputProps={{
                          endAdornment: <Edit sx={{ color: 'text.secondary' }} />,
                          sx: {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={settings.profile.email}
                        InputProps={{
                          startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                          readOnly: true,
                          sx: {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Bio"
                        value={settings.profile.bio}
                        onChange={(e) => handleSettingChange('profile.bio', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>

              {/* Security Section */}
              <Collapse in={expanded.security}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8e53 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                  }}>
                    <Security sx={{ mr: 1 }} /> Security
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.security.twoFactor}
                            onChange={(e) => handleSettingChange('security.twoFactor', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Two-Factor Authentication
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="New Password"
                        value={settings.security.password}
                        onChange={(e) => handleSettingChange('security.password', e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: 2,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                        Connected Devices
                      </Typography>
                      {settings.security.connectedDevices.map((device) => (
                        <Chip
                          key={device}
                          label={device}
                          sx={{ 
                            m: 0.5,
                            bgcolor: 'background.paper',
                            boxShadow: 1
                          }}
                          deleteIcon={<Delete />}
                          onDelete={() => {}}
                        />
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>

              {/* Appearance Section */}
              <Collapse in={expanded.appearance}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, #4CAF50 0%, #2cccff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                  }}>
                    <Palette sx={{ mr: 1 }} /> Appearance
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.preferences.darkMode}
                            onChange={(e) => handleSettingChange('preferences.darkMode', e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Dark Mode
                          </Typography>
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                        Theme Color
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        {themeColors.map((color) => (
                          <IconButton
                            key={color}
                            sx={{
                              bgcolor: color,
                              width: 48,
                              height: 48,
                              border: settings.preferences.themeColor === color ? '2px solid white' : 'none',
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                            onClick={() => handleSettingChange('preferences.themeColor', color)}
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>

              {/* Action Bar */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSaveSettings}
                  startIcon={<Save />}
                  disabled={!editMode}
                  sx={{
                    backgroundColor: '#4CAF50', 
                    borderRadius: 2,
                    px: 5,
                    py: 2,
                    fontWeight: 600,
                    fontSize: '16px',
                    letterSpacing: '1px',
                    textTransform: 'none',
                    border: '2px solid #388E3C',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      backgroundColor: '#388E3C',  
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                      border: '2px solid #1B5E20', 
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                      boxShadow: 'none',
                      border: '2px solid #1B5E20',  
                    },
                    '&:disabled': {
                      backgroundColor: '#A5D6A7',  
                      boxShadow: 'none',
                      cursor: 'not-allowed',
                      border: '2px solid #81C784',  
                    }
                  }}
                >
                  Save Settings
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setEditMode(!editMode)}
                  startIcon={<Edit />}
                  sx={{
                    borderColor: 'text.secondary',
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {editMode ? 'Cancel Editing' : 'Edit Settings'}
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsDashboard;