import React, { useState } from 'react';
import { Snackbar as MUISnackbar, Alert } from '@mui/material';

function Snackbar({ message, severity, open, onClose }) {
  return (
    <MUISnackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}

export default Snackbar;
