import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import api from '../../services/api'; 
import { AuthContext } from '../../context/AuthContext';

const ContactForm = () => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!user) {
      setError('You must be logged in to send a message.');
      return;
    }

    try {

      await api.post('/contact', { name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <Paper id="contact-form" sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>Contact Us</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
        {success && <Typography color="green">Message sent successfully!</Typography>}
        {error && <Typography color="red">{error}</Typography>}
      </form>
    </Paper>
  );
};

export default ContactForm;
