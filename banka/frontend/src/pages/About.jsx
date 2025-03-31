import React from 'react';
import { Typography, Paper, Container, Grid, Box } from '@mui/material';
import SecurityImage from '../assets/Section2.jpg';
import InstantImage from '../assets/Section3.jpg';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 4, bgcolor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom align="center">
          About WealthCore
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              WealthCore is a modern banking application designed to provide a seamless and secure experience for managing your finances. We believe in empowering our users with the tools they need to achieve their financial goals.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Key Features:
            </Typography>
            <Typography variant="body1" paragraph>
              - **Account Management:** Create, view, and manage your accounts with ease.
            </Typography>
            <Typography variant="body1" paragraph>
              - **Transaction Management:** View your transaction history and track your spending. Our staff can also assist with debiting and crediting accounts.
            </Typography>
            <Typography variant="body1" paragraph>
              - **Secure Authentication:** Sign up, log in, and reset your password with our secure authentication system.
            </Typography>
            <Typography variant="body1" paragraph>
              - **Role-Based Access Control:** Access different features based on your role (client, staff, or admin).
            </Typography>
            <Typography variant="body1" paragraph>
              - **Audit Logs:** Track all staff and admin actions for enhanced security and accountability.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <img src={SecurityImage} alt="Security" style={{ maxWidth: '100%', borderRadius: 8 }} />
              <img src={InstantImage} alt="Instant" style={{ maxWidth: '100%', borderRadius: 8 }} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;
