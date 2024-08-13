import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Wedding Reservation
      </Typography>
    </Box>
  );
}

export default Footer;
