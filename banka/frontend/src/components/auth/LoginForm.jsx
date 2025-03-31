import React, { useContext, useState } from 'react';
import { Paper, Typography, Alert, TextField, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/AuthContext';
import BackgroundImage from '../../assets/Hero Background.jpg'; // Make sure the path is correct

const LoginForm = () => {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6).required('Required')
    }),
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (err) {
        console.log(err);
        setError('Invalid credentials'); // Consistent error message
      }
    }
  });

  return (
    <Grid container sx={{ minHeight: '100vh', margin: 0 }}>
      {/* Left Section (Background Image and Text) */}
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: { xs: 2, sm: 4, md: 6 }, // Responsive padding
        order: { xs: 1, md: 0 }, // Correct order for mobile
        position: 'relative', // Needed for absolute positioning of the background
        overflow: 'hidden' // To contain the background image
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover', // Ensure image covers the entire area
          backgroundPosition: 'center', // Center the image
          filter: 'blur(3px) brightness(0.4)', // Keep blur and brightness
          zIndex: -1, // Ensure it's behind the text and form
        }} />

        {/* Text Content */}
        <Paper sx={{
          padding: { xs: 3, sm: 4, md: 6 }, // Responsive padding
          textAlign: 'left',
          backgroundColor: 'rgba(182, 188, 255, 0.01)', // Keep the semi-transparent background
          mb: 3,
          maxWidth: '90%', // Ensure text doesn't overflow on small screens
        }}>
          <Typography variant="h2" sx={{
            color: 'white',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }, // Responsive font size
            fontWeight: 'bold' // Make the heading bold
          }}>
            Welcome Back To <br />WealthCore: 
          </Typography>
          <Typography variant="body1" sx={{
            mb: 2,
            color: 'white',
            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } // Responsive font size
          }}>
            Enjoy seamless and more secure transaction with us today
          </Typography>
        </Paper>
      </Grid>

      {/* Right Section (Form) */}
      <Grid item xs={12} md={6} sx={{
        display: 'flex',
        justifyContent: 'center', // Center the form horizontally
        alignItems: 'center', // Center the form vertically
        backgroundColor: 'background.paper',
        padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        order: { xs: 0, md: 1 } // Ensure form is on right on desktop, top on mobile
      }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <form onSubmit={formik.handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              variant="outlined" // Use outlined variant for better appearance
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              variant="outlined" // Use outlined variant
            />

            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  backgroundColor: '#1976d2', // Use a primary color
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#115293', // Darker shade on hover
                  }
                }}
              >
                Login
              </Button>

              <Link to="/reset-password" style={{ display: 'block', textAlign: 'center', mb: 2, color: '#1976d2' }}>
                Forgot Password?
              </Link>

              <Typography variant="body2" align="center">
                Don't have an account? <Link to="/signup" style={{ color: '#1976d2' }}>Sign up here</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
