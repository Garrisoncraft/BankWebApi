import React, { useContext } from "react";
import { Typography, Box, Container, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Section3 from "../assets/Section3.jpg";
import { AuthContext } from "../context/AuthContext";

// Styled components for potential customization
const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#111827", // Dark heading color
  marginBottom: theme.spacing(2),
  fontSize: "2.5rem", // Larger font size
  lineHeight: 1.2,
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  color: "#4b5563", // Gray description color
  marginBottom: theme.spacing(4),
  fontSize: "1rem",
  lineHeight: 1.75,
}));

const StyledButton = styled(Button)(({ theme, variant }) => ({
  marginRight: theme.spacing(2),
  paddingX: theme.spacing(3),
  paddingY: theme.spacing(1.25),
  fontWeight: "medium",
  ...(variant === "contained" && {
    backgroundColor: "#6366f1", 
    color: "white",
    "&:hover": {
      backgroundColor: "#4338ca", 
    },
  }),
  ...(variant === "outlined" && {
    color: "#6b7280", 
    borderColor: "#d1d5db", 
    "&:hover": {
      backgroundColor: "black",
      color: 'white',
      borderColor: "#d1d5db",
    },
  }),
  borderRadius: "0.375rem", // Tailwind rounded-md
}));

const ImageContainer = styled(Box)(() => ({
  width: "100%",
  height: "auto",
  borderRadius: "0.5rem", // Tailwind rounded-md
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind shadow-md
}));

const Instant = () => {
    const user = useContext(AuthContext);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb", // Tailwind gray-100
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Text Content (Left on larger screens) */}
        <Grid item xs={12} md={6}>
          <Box sx={{ paddingRight: { md: 4 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "#6b7280", // Text color
                marginBottom: 1,
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <StyledDescription variant="body1">
              With our instant transaction feature, you can send and receive
              money in real-time, ensuring that funds are always at your
              fingertips. Enjoy the convenience of immediate transfers without
              the hassle of delays. Our secure platform guarantees that your
              transactions are safe and efficient.
            </StyledDescription>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <StyledButton variant="outlined">Learn More</StyledButton>

              {!user ? (
              <StyledButton variant="contained">Sign Up →</StyledButton>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* Image  */}
        <Grid item xs={12}>
          <ImageContainer>
            <img
              src={Section3} 
              alt="Seamless Transactions"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                filter: "brightness(0.5)",
              }}
            />
          </ImageContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Instant;
