import React from 'react';
import { LinearProgress, Typography } from '@mui/material';
import zxcvbn from 'zxcvbn';

const PasswordStrengthMeter = ({ password }) => {
  const { score } = zxcvbn(password);
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];

  return (
    <div>
      <Typography variant="body2">
        Password Strength: {strengthLabels[score]}
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={(score + 1) * 20} 
        sx={{ bgcolor: strengthColors[score] }} 
      />
    </div>
  );
};

export default PasswordStrengthMeter;
