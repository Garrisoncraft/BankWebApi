import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Box, Container, Grid, Button, TextField } from '@mui/material';
import Logo from '../assets/Logo.jpeg'
import { HashLink } from 'react-router-hash-link';



const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#f9fafb', paddingY: 6}}>
            <Container maxWidth="xl">
                {/* Subscribe Section */}
                <Grid container spacing={4} marginBottom={8}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', marginBottom: 2,fontSize: '1.25rem'}} >
                            Subscribe to Updates
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4b5563', marginBottom: 4 }}>
                            Stay informed about our latest news and offers
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <Box sx={{ display: 'flex', width: '100%', maxWidth: '400px' }}>
                            <TextField type="email" placeholder="Your email*" variant="outlined" sx={{flex: 1, mr: 2, '& .MuiOutlinedInput-root': { borderRadius: '0.375rem 0 0 0.375rem'}, }} />
                            <Button variant="contained" sx={{ backgroundColor:'rgb(247, 247, 249)', color: 'black', borderRadius: '0 0.375rem 0.375rem 0', '&:hover': { backgroundColor: 'black', color: 'white' },}}>
                                Join
                            </Button>
                        </Box>
                         <Typography variant="body2" sx={{ color: '#4b5563', fontSize: '0.875rem', marginTop: 2}}>
                            By subscribing, you agree to our Privacy Policy
                        </Typography>
                    </Grid>
                </Grid>

                {/* Main Footer Content */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                             <Avatar src={Logo} alt="Logo" sx={{ width: 100, height: 100, mr: 1 }} />
                             <Typography variant="h6" style={{ flexGrow: 1, marginTop: 40, fontWeight: 'bold' }}>
                               WealthCore
                             </Typography>
                             </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1f2937', marginBottom: 2, fontSize: '1.1rem' }}>
                            Quick Links
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1,  textDecoration: 'none' }} component={Link} to={"/"}>
                                HOME
                            </Typography>
                            <Box/>
                            <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1,  textDecoration: 'none' }} component={Link} to="/about">
                                About Us
                            </Typography>
                            </Box>
                            <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563',  textDecoration: 'none' }} component={HashLink} to="#contact-form">
                                Contact Us
                            </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2, fontSize: '1.1rem' }} >
                            Follow Us
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1 ,  textDecoration: 'none'}}>
                                FACEBOOK
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1,  textDecoration: 'none' }}>
                                TWITTER
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#4b5563',  textDecoration: 'none' }}>
                                INSTAGRAM
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937', mb: 2, fontSize: '1.1rem',  textDecoration: 'none' }}>
                            Legal
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1,  textDecoration: 'none' }} component={Link} to="/">
                                Privacy Policy
                            </Typography>
                            </Box>
                            <Box>
                            <Typography variant="body2" sx={{ color: '#4b5563', mb: 1,  textDecoration: 'none' }} component={Link} to="/">
                                Terms of Use
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box sx={{ mt: 8, pt: 4,  borderTop: '1px solid #e5e7eb', textAlign: 'center', color: '#4b5563', fontSize: '0.875rem'}}
                >
                    &copy; 2024 WealthCore. All rights reserved.
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
