import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid, Box, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import api from '../../services/api';
import SupportImage from '../../assets/Contact.jpg';

// Styled Button for custom hover effects
const StyledButton = styled(Button)(({ theme }) => ({
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.03)',
  },
}));

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.post('/contact', { name, email, message });
      setSuccessMessage('Message sent successfully! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setErrorMessage(err.response?.data?.error || err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    // Use Grid container for layout
    <Grid container spacing={4} sx={{ mt: 4, mb: 4, alignItems: 'center', justifyContent: 'center' }}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
           <img src={SupportImage} alt="Contact Support" style={{ maxWidth: '80%', height: 'auto', borderRadius: 12, boxShadow: '0 6px 15px rgba(0,0,0,0.15)' }} />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper id="contact-form" elevation={4} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ContactMailIcon color="primary" sx={{ mr: 1, fontSize: '2rem' }} />
            <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Get in Touch</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Have questions or need assistance? Fill out the form below, and our team will respond promptly.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Your Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Your Message"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <StyledButton type="submit" variant="contained" color="primary" fullWidth size="large">
              Send Message
            </StyledButton>
            {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
