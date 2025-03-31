import React from 'react';
import { Typography, Box, Container, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle } from 'lucide-react'; 
import Support from '../assets/Support.jpeg'


// Styled components for potential customization
const StyledTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: '#111827', 
    marginBottom: theme.spacing(2),
    fontSize: '2.25rem',  
    lineHeight: 1.2,
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
    color: '#4b5563',
    marginBottom: theme.spacing(4),
    fontSize: '1rem',
    lineHeight: 1.75,
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
    marginRight: theme.spacing(2),
    paddingX: theme.spacing(3),
    paddingY: theme.spacing(1.25),
    fontWeight: 'medium',
    borderRadius: '0.375rem', 
    ...(variant === 'contained' && {
        backgroundColor: '#6366f1', 
        color: 'white',
        '&:hover': {
            backgroundColor: '#4338ca',
        },
    }),
    ...(variant === 'outlined' && {
        color: '#6b7280', 
        borderColor: '#d1d5db',
        '&:hover': {
            backgroundColor: 'black',
            color: 'white',
            borderColor: '#d1d5db',
        },
    }),
}));

const ImageContainer = styled(Box)(() => ({
    width: '100%',
    height: 'auto',
    borderRadius: '0.5rem', 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
    overflow: 'hidden', 
}));

const FeatureItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));

const SupportSection = () => {
    return (
        <Container
            maxWidth="xl"
            sx={{
                py: 6, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb', 
            }}
        >
            <Grid container spacing={4} alignItems="center">
                {/* Text Content (Left on larger screens) */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ paddingRight: { md: 4 } }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 'bold',
                                color: '#6b7280', 
                                marginBottom: 1,
                            }}
                        >
                            Support
                        </Typography>
                        <StyledTitle variant="h2">
                            Always Here for You, Day and Night
                        </StyledTitle>
                        <StyledDescription variant="body1">
                            Our dedicated support team is available 24/7 to assist you with any
                            inquiries and issues. Experience peace of mind knowing help is just a
                            call or a click away.
                        </StyledDescription>
                        <FeatureItem>
                            <CheckCircle
                                size={20}
                                color="#6366f1"
                                style={{ marginRight: 8 }}
                            />
                            <Typography variant="body1">
                                Get assistance whenever you need it
                            </Typography>
                        </FeatureItem>
                        <FeatureItem>
                            <CheckCircle
                                size={20}
                                color="#6366f1"
                                style={{ marginRight: 8 }}
                            />
                            <Typography variant="body1">
                                Reach out to us anytime, day or night
                            </Typography>
                        </FeatureItem>
                        <FeatureItem>
                            <CheckCircle
                                size={20}
                                color="#6366f1"
                                style={{ marginRight: 8 }}
                            />
                            <Typography variant="body1">
                                Your questions are important to us
                            </Typography>
                        </FeatureItem>

                        <StyledButton variant="outlined">Contact</StyledButton>
                        <StyledButton variant="text" sx={{paddingLeft: 0, color: '#6366f1'}}>Help →</StyledButton>
                    </Box>
                </Grid>

                {/* Image (Right on larger screens) */}
                <Grid item xs={12} md={6}>
                    <ImageContainer>
                        <img src= {Support} alt="24/7 Support" style={{ width: '100%', height: '100%', display: 'block', filter: 'brightness(0.8)'}} />
                    </ImageContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SupportSection;
