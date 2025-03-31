import React, { useContext } from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom'; 
import BackgroundImage from '../assets/Hero Background.jpg';
import { AuthContext } from '../context/AuthContext';

const Hero = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BackgroundImage})`,
          filter: 'blur(3px) brightness(0.4)',
          zIndex: -1,
        }}
      />
      <Paper
        sx={{
          p: { xs: 5, sm: 5, md: 25 },
          textAlign: 'center',
          backgroundColor: 'rgba(182, 188, 255, 0.01)',
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontSize: { xs: '1rem', sm: '2rem', md: '3rem' },
          }}
        >
          Welcome To WealthCore: <br /> Your Banking Solution
        </Typography>
        <br />
        <Typography
          variant="h7"
          sx={{
            mb: 2,
            color: 'white',
            fontSize: { xs: '.75rem', sm: '0.75rem', md: '1.5rem' },
          }}
        >
          Experience seamless banking with our secure and user friendly platform.
          Join us today and take <br />
          control of your financial future
        </Typography>
        <br />
        <br />
        {!user ? (
          <>
            <Button variant="contained" color="primary" sx={{ mr: 10 }} component={Link} to="/signup">
              Sign Up
            </Button>
            <Button variant="outlined" sx={{ color: 'white', fontWeight: 'bold', borderWidth: 2 }} component={Link} to="/login">
              Login
            </Button>
          </>
        ) : null}
      </Paper>
    </div>
  );
};

export default Hero;
