import React from 'react';
import {Typography, Grid2, Paper } from '@mui/material';
import ContactForm from '../components/common/ContactForm';
import HeroSection from '../components/Hero';
import SecuritySection from '../components/Security';
import InstantSection from '../components/Instant';
import SupportSection from '../components/Support';

const HomePage = () => {
  return (
    <>
    
    <HeroSection/>
    <SecuritySection/>
    <InstantSection/>
    <SupportSection/>
    <ContactForm/>
    </>
  );
};

export default HomePage;
