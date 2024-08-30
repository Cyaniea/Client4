import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';

function Confirmation() {
  const location = useLocation();
  const reservationData = location.state;

  if (!reservationData) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Konfirmasi Reservasi
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">Nama: {reservationData.name}</Typography>
          <Typography variant="body1">Email: {reservationData.email}</Typography>
          <Typography variant="body1">Jumlah Tamu: {reservationData.guests}</Typography>
          <Typography variant="body1">
            Tanggal: {formatDate(reservationData.date)}
          </Typography>
          {reservationData.reservationId && (
            <Typography variant="body1">ID Reservasi: {reservationData.reservationId}</Typography>
          )}
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Terima kasih atas reservasi Anda. Kami akan menghubungi Anda segera untuk konfirmasi lebih lanjut.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => window.print()}>
            Cetak Konfirmasi
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Confirmation;