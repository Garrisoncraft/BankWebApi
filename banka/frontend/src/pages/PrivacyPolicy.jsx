import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <iframe src="/privacy-policy.pdf" width="100%" height="500px" title="Privacy Policy"></iframe>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
