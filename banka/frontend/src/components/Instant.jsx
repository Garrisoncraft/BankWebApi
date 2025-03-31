import React, { useContext } from "react";
import { Typography, Box, Container, Grid, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import Section3 from "../assets/Section3.jpg";
import { AuthContext } from "../context/AuthContext";

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

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

// Enhanced styled components with animations
const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#111827", // Dark heading color
  marginBottom: theme.spacing(2),
  fontSize: "2.5rem", // Larger font size
  lineHeight: 1.2,
  animation: `${fadeIn} 1.2s ease-out`,
  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  color: "#4b5563", // Gray description color
  marginBottom: theme.spacing(4),
  fontSize: "1rem",
  lineHeight: 1.75,
  animation: `${fadeIn} 1.4s ease-out`,
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  marginRight: theme.spacing(2),
  paddingX: theme.spacing(3),
  paddingY: theme.spacing(1.25),
  fontWeight: "medium",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  
  ...(variant === "contained" && {
    backgroundColor: "#6366f1", 
    color: "white",
    "&:hover": {
      backgroundColor: "#4338ca",
      transform: "scale(1.05)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  }),
  ...(variant === "outlined" && {
    color: "#6b7280", 
    borderColor: "#d1d5db", 
    "&:hover": {
      backgroundColor: "black",
      color: 'white',
      borderColor: "#d1d5db",
      transform: "scale(1.05)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
  }),
  borderRadius: "0.375rem", // Tailwind rounded-md
}));

const ImageContainer = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  borderRadius: "1rem", // Increased border radius
  overflow: "hidden",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", // Enhanced shadow
  animation: `${scaleUp} 1.6s ease-out`,
  transition: "transform 0.5s ease, box-shadow 0.5s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  }
}));

const Instant = () => {
    // Fixed user context extraction
    const { user } = useContext(AuthContext);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 8, // Increased vertical padding
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb", // Tailwind gray-100
      }}
    >
      <Paper elevation={0} sx={{ 
        bgcolor: 'transparent',
        p: 3,
        borderRadius: 4,
        overflow: 'hidden',
        width: '100%',
        animation: `${fadeIn} 1s ease-out`,
      }}>
      <Grid container spacing={4} alignItems="center"> {/* Increased spacing */}
        {/* Text Content (Left on larger screens) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            paddingRight: { md: 4 },
            animation: `${fadeIn} 1s ease-out`,
          }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#6b7280", // Text color
                marginBottom: 1,
                animation: `${fadeIn} 1.1s ease-out`,
              }}
            >
              Instant
            </Typography>
            <StyledTitle variant="h2">
              Experience Seamless Transaction Anytime, Anywhere
            </StyledTitle>
          </Box>
        </Grid>

        {/* Box with Description and Buttons (Right on larger screens) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            animation: `${slideInRight} 1.3s ease-out`
          }}>
            <StyledDescription variant="body1">
              With our instant transaction feature, you can send and receive
              money in real-time, ensuring that funds are always at your
              fingertips. Enjoy the convenience of immediate transfers without
              the hassle of delays. Our secure platform guarantees that your
              transactions are safe and efficient.
            </StyledDescription>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',
              animation: `${fadeIn} 1.8s ease-out`
            }}>
              <StyledButton   component={Link} to="/about" variant="outlined">Learn More</StyledButton>

              {!user ? (
                <StyledButton 
                  variant="contained" 
                  component={Link} 
                  to="/signup"
                >
                  Sign Up →
                </StyledButton>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* Image  */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <ImageContainer>
            <img
              src={Section3} 
              alt="Seamless Transactions"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                filter: "brightness(0.6)",
                transition: "filter 0.5s ease, transform 0.5s ease",
              }}
              onMouseOver={(e) => {e.currentTarget.style.filter = "brightness(0.8)"; e.currentTarget.style.transform = "scale(1.02)"}}
              onMouseOut={(e) => {e.currentTarget.style.filter = "brightness(0.6)"; e.currentTarget.style.transform = "scale(1)"}}
            />
          </ImageContainer>
        </Grid>
      </Grid>
      </Paper>
    </Container>
  );
};

export default Instant;
