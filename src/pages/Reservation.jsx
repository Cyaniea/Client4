import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material'; // Tambahkan Box di sini
import ReservationForm from '../components/ReservationForm';

function Reservation() {
  const navigate = useNavigate();

  const handleReservation = (data) => {
    // Di sini Anda bisa menambahkan logika untuk menyimpan reservasi
    console.log('Reservation data:', data);
    // Redirect ke halaman konfirmasi
    navigate('/confirmation', { state: data });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Reservasi Pernikahan
        </Typography>
        <ReservationForm onSubmit={handleReservation} />
      </Container>
    </Box>
  );
}

export default Reservation;
