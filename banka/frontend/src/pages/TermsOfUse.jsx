import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Use
        </Typography>
        <iframe src="/terms-of-use.pdf" width="100%" height="500px" title="Terms of Use"></iframe>
      </Paper>
    </Container>
  );
};

export default TermsOfUse;
