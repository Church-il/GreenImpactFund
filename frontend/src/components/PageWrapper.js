import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Box sx={{ px: 4, py: 2, minHeight: 'calc(100vh - 64px)', backgroundColor: '#f5f5f5' }}>
        {children}
      </Box>
    </motion.div>
  );
};

export default PageWrapper;
