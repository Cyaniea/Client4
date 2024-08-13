import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function PackageDetail() {
  const { id } = useParams();
  
  return (
    <Container>
      <Typography variant="h4">
        Detail Paket {parseInt(id) + 1}
      </Typography>
      {/* Tambahkan detail paket di sini */}
    </Container>
  );
}

export default PackageDetail;