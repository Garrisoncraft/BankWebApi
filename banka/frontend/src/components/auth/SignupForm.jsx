import React, { useState, useContext} from 'react';
import { TextField, Button, Paper, Typography, Select, MenuItem, InputLabel, FormControl, Alert, Box, Grid } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../../components/common/PasswordStrengthMeter';
import BackgroundImage from '../../assets/Hero Background.jpg';


const SignupForm = () => {
  const { signup } = useContext(AuthContext);
  const slogan = "Your trusted partner in banking.";
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    firstName: '',
    lastName: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(credentials);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <>
    <Grid container sx={{ minHeight: '100vh', margin: 0 }}>
      {/* Left Section (Background Image and Text) */}
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: { xs: 2, sm: 4, md: 6 },
        order: { xs: 1, md: 0 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px) brightness(0.4)',
          zIndex: -1,
        }} />
        <Paper sx={{
          padding: { xs: 3, sm: 4, md: 6 },
          textAlign: 'left',
          backgroundColor: 'rgba(182, 188, 255, 0.01)',
          mb: 3,
          maxWidth: '90%',
        }}>
          <Typography variant="h2" sx={{
            color: 'white',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
            fontWeight: 'bold'
          }}>
            Welcome to WorthCore Bank
          </Typography>
          <Typography variant="body1" sx={{
            mb: 2,
            color: 'white',
            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' }
          }}>
            {slogan}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
        </Paper>
      </Grid>

      {/* Right Section (Form) */}
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        padding: { xs: 2, sm: 3, md: 4 },
        order: { xs: 0, md: 1 }
      }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={credentials.firstName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={credentials.lastName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <PasswordStrengthMeter password={credentials.password} />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={credentials.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#115293',
                }
              }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" sx={{ color: 'black', mt: 2 }}>
              Already have an account? <Link to="/login" style={{ color: '#1976d2' }}>Login here</Link>
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
    </>
  );
};

export default SignupForm;
