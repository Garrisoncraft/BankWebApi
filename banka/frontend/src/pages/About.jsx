import React from 'react';
import { Typography, Paper, Container, Grid, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityImage from '../assets/Section2.jpg'; // Assuming this relates to security/features
import InstantImage from '../assets/Section3.jpg'; // Assuming this relates to mission/vision

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}> {/* Added vertical padding */}
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        About WealthCore
      </Typography>

      {/* Section 1: Introduction */}
      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2 }}> {/* Added elevation, padding, margin, border radius */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
              Your Partner in Financial Empowerment
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}> {/* Increased line height */}
              WealthCore is a modern banking application designed to provide a seamless and secure experience for managing your finances. We believe in empowering our users with intuitive tools and robust security to help them achieve their financial goals confidently.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              Our platform offers comprehensive solutions for everyday banking needs, backed by dedicated support and a commitment to transparency.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={InstantImage} alt="Financial Empowerment" style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} /> {/* Added shadow */}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Section 2: Key Features */}
      <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 2, bgcolor: 'grey.100' }}> 
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}> 
             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               <img src={SecurityImage} alt="Secure Features" style={{ maxWidth: '100%', height: 'auto', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} /> {/* Added shadow */}
             </Box>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}> {/* Text second on mobile */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
              Powerful Features, Simplified
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><AccountBalanceWalletIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Account Management" secondary="Create, view, and manage your accounts with ease." />
              </ListItem>
              <ListItem>
                <ListItemIcon><ReceiptLongIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Transaction Management" secondary="Track history, spending, and manage transfers." />
              </ListItem>
              <ListItem>
                <ListItemIcon><LockIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Secure Authentication" secondary="Robust sign-up, login, and password recovery." />
              </ListItem>
              <ListItem>
                <ListItemIcon><GroupIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Role-Based Access" secondary="Tailored features for clients, staff, and admins." />
              </ListItem>
              <ListItem>
                <ListItemIcon><AdminPanelSettingsIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Audit Logs" secondary="Enhanced security via comprehensive action tracking." />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

    </Container>
  );
};

export default About;
