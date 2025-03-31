import React, { useContext } from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { keyframes } from '@mui/system';
import BackgroundImage from '../assets/Hero Background.jpg';
import { AuthContext } from '../context/AuthContext';

// Define animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

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
          backgroundColor: 'rgba(182, 188, 255, 0.05)',
          mb: 3,
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          borderRadius: 2,
          animation: `${fadeIn} 1s ease-out`,
          '&:hover': {
            boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
            transition: 'box-shadow 0.3s ease-in-out',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontSize: { xs: '1rem', sm: '2rem', md: '3rem' },
            animation: `${fadeIn} 1.2s ease-out`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
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
            animation: `${fadeIn} 1.4s ease-out`,
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          Experience seamless banking with our secure and user friendly platform.
          Join us today and take <br />
          control of your financial future
        </Typography>
        <br />
        <br />
        {!user ? (
          <Box sx={{ animation: `${fadeIn} 1.6s ease-out` }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                mr: 10, 
                px: 3, 
                py: 1, 
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                '&:hover': {
                  animation: `${pulse} 2s infinite ease-in-out`,
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                } 
              }} 
              component={Link} 
              to="/signup"
            >
              Sign Up
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                borderWidth: 2,
                px: 3,
                py: 1,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                '&:hover': {
                  animation: `${pulse} 2s infinite ease-in-out`,
                  boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
                  borderWidth: 2,
                }
              }} 
              component={Link} 
              to="/login"
            >
              Login
            </Button>
          </Box>
        ) : null}
      </Paper>
    </div>
  );
};

export default Hero;
