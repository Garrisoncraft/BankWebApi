import React, { useContext } from 'react'
import {Typography, Box, Container, Grid, Button} from '@mui/material';
import Section2 from '../assets/Section2.jpg' 
import { AuthContext } from '../context/AuthContext';

const Security = () => {
        const user = useContext(AuthContext);

  return ( 
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f9fafb'}} >
            <Grid container spacing={4} alignItems="center">
                 {/*Left Side*/}
                <Grid item xs={12} md={6}>
                    <Box sx={{ paddingRight: { md: 2 } }}>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: '#6b7280', mb: 1 }} >
                                   Secure
                        </Typography>
                        <Typography variant="h2" sx={{fontWeight: 'bold',color: '#111827', mb: 2, fontSize: '2.5rem', lineHeight: 1.2 }}>
                                           Create Your Account with <br />Confidence Today
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#4b5563', mb: 4, fontSize: '1rem', lineHeight: 1.75 }}>
                                        Experience seamless and secure account creation with WealthCore. Our <br />
                                        user-friendly interface ensures you can start banking in no time.
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', mb: 1 }}>
                                    Easy Setup
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4b5563' }}>
                                    Quickly create your account <br /> with just a few simple steps.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', mb: 1, }}>
                                    Robust Security
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#4b5563'}}>
                                    Your data is protected with industry <br />leading security measures.
                                </Typography>
                            </Grid>
                        </Grid>

                         <Box mt={4}>
                            { !user ? (
                            <Button variant="contained" size="large" sx={{ backgroundColor: '#6366f1', color: 'white','&:hover': { backgroundColor: '#4338ca'}, mr: 2, paddingX: 3, paddingY: 1.25, fontWeight: 'medium' }} >
                                     Sign Up
                            </Button>
                            ) : null }
                            <Button variant="outline" size="large" sx={{ color: '#6b7280', borderColor: '#d1d5db', '&:hover': {  backgroundColor: 'black', color: 'white', borderColor: '#d1d5db' }, paddingX: 3,paddingY: 1.25,fontWeight: 'medium'}}>
                                     Learn More
                            </Button>
                         </Box>
                    </Box>
                 </Grid>
                         {/*Right Side */}
                      <Grid item xs={12} md={6}>
                      <Box component="img" src={Section2} alt="Security" sx={{ width: '100%', height: 'auto', borderRadius: 2, filter: 'brightness(0.5)' }}/>                       
                     </Grid>

                </Grid>
            </Container>
  )
}

export default Security
