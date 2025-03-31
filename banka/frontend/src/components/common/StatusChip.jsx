import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  const colorMap = {
    active: 'success',
    dormant: 'warning',
    pending: 'info',
    completed: 'success',
    failed: 'error',
  };

  return (
    <Chip 
      label={status.toUpperCase()} 
      color={colorMap[status.toLowerCase()]}
      sx={{ textTransform: 'capitalize' }}
    />
  );
};

export default StatusChip;