import React, { useContext } from 'react'
import {Typography, Box, Container, Grid, Button, Paper} from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@mui/system';
import Section2 from '../assets/Section2.jpg' 
import { AuthContext } from '../context/AuthContext';

// Define animations
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const growUp = keyframes`
  from {
    transform: scale(0.97);
  }
  to {
    transform: scale(1);
  }
`;

const Security = () => {
        // Fixed user context extraction
        const { user } = useContext(AuthContext);

  return ( 
        <Container maxWidth="xl" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          backgroundColor: '#f9fafb',
          py: 6 // Added vertical padding
        }} >
            <Paper elevation={0} sx={{ 
              bgcolor: 'transparent',
              p: 3,
              borderRadius: 4,
              overflow: 'hidden',
              width: '100%',
              animation: `${growUp} 1s ease-out`,
            }}>
            <Grid container spacing={6} alignItems="center">
                 {/*Left Side*/}
                <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      paddingRight: { md: 4 },
                      animation: `${slideInLeft} 1.2s ease-out`,
                    }}>
                        <Typography variant="subtitle1" sx={{
                          fontWeight: 'bold', 
                          color: '#6b7280', 
                          mb: 1,
                          animation: `${slideInLeft} 1.4s ease-out`,
                        }} >
                                   Secure
                        </Typography>
                        <Typography variant="h2" sx={{
                          fontWeight: 'bold',
                          color: '#111827', 
                          mb: 2, 
                          fontSize: '2.5rem', 
                          lineHeight: 1.2,
                          animation: `${slideInLeft} 1.6s ease-out`,
                          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        }}>
                                           Create Your Account with <br />Confidence Today
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#4b5563', 
                          mb: 4, 
                          fontSize: '1rem', 
                          lineHeight: 1.75,
                          animation: `${slideInLeft} 1.8s ease-out`,
                        }}>
                                        Experience seamless and secure account creation with WealthCore. Our <br />
                                        user-friendly interface ensures you can start banking in no time.
                        </Typography>

                        <Grid container spacing={4} sx={{ animation: `${slideInLeft} 2s ease-out` }}>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={2} sx={{ 
                                  p: 2, 
                                  borderRadius: 2, 
                                  bgcolor: 'white',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    transform: 'translateY(-5px) rotate(1deg)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                  } 
                                }}>
                                  <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
                                      Easy Setup
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#4b5563' }}>
                                      Quickly create your account <br /> with just a few simple steps.
                                  </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={2} sx={{ 
                                  p: 2, 
                                  borderRadius: 2, 
                                  bgcolor: 'white',
                                  transition: 'transform 0.3s, box-shadow 0.3s',
                                  '&:hover': {
                                    transform: 'translateY(-5px) rotate(-1deg)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                  } 
                                }}>
                                  <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', mb: 1, }}>
                                      Robust Security
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: '#4b5563'}}>
                                      Your data is protected with industry <br />leading security measures.
                                  </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                         <Box mt={4} sx={{ animation: `${slideInLeft} 2.2s ease-out` }}>
                            { !user ? (
                            <Button 
                              component={Link} 
                              to="/signup" 
                              variant="contained" 
                              size="large" 
                              sx={{ 
                                backgroundColor: '#6366f1', 
                                color: 'white',
                                '&:hover': { 
                                  backgroundColor: '#4338ca',
                                  transform: 'scale(1.05)',
                                  boxShadow: '0 6px 15px rgba(99, 102, 241, 0.4)',
                                }, 
                                mr: 2, 
                                paddingX: 3, 
                                paddingY: 1.25, 
                                fontWeight: 'medium',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)',
                              }} 
                            >
                                     Sign Up
                            </Button>
                            ) : null }
                            <Button 
                            component={Link}
                            to="/about"
                              variant="outlined" 
                              size="large" 
                              sx={{ 
                                color: '#6b7280', 
                                borderColor: '#d1d5db', 
                                '&:hover': {  
                                  backgroundColor: 'black', 
                                  color: 'white', 
                                  borderColor: '#d1d5db',
                                  transform: 'scale(1.05)',
                                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                }, 
                                paddingX: 3,
                                paddingY: 1.25,
                                fontWeight: 'medium',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                                     Learn More
                            </Button>
                         </Box>
                    </Box>
                     </Grid>
                         {/*Right Side */}
                      <Grid item xs={12} md={6}>
                        <Box sx={{ 
                          animation: `${slideInRight} 1.5s ease-out`,
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
                          transition: 'transform 0.5s, box-shadow 0.5s',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: '0 25px 35px rgba(0, 0, 0, 0.2)',
                          }
                        }}>
                          <Box 
                            component="img" 
                            src={Section2} 
                            alt="Security" 
                            sx={{ 
                              width: '100%', 
                              height: 'auto', 
                              borderRadius: 4, 
                              filter: 'brightness(0.7)',
                              transition: 'filter 0.5s',
                              '&:hover': {
                                filter: 'brightness(0.9)',
                              }
                            }}
                          />                       
                        </Box>
                     </Grid>

                </Grid>
            </Paper>
            </Container>
  )
}

export default Security
