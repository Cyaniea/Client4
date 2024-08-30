import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ReservationForm from '../components/ReservationForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Reservation() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReservation = async (data) => {
    setLoading(true);
    setError('');
    try {
      // Move the console.log here
      console.log('Data being sent to Firestore:', {
        ...data,
        guests: parseInt(data.guests),
        date: new Date(data.date),
        createdAt: new Date()
      });

      const docRef = await addDoc(collection(db, 'reservations'), {
        ...data,
        guests: parseInt(data.guests),
        date: new Date(data.date),
        createdAt: new Date()
      });
      console.log("Reservation saved with ID: ", docRef.id);
      navigate('/confirmation', { 
        state: { 
          ...data, 
          reservationId: docRef.id
        } 
      });
    } catch (error) {
      console.error("Full error object:", error); // Log the full error object
      setError('Terjadi kesalahan saat menyimpan reservasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reservasi Pernikahan
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <ReservationForm onSubmit={handleReservation} />
        )}
      </Box>
    </Container>
  );
}

export default Reservation;