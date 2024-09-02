import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ReservationForm from '../components/ReservationForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Reservation() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the current user

  const handleReservation = async (data) => {
    setLoading(true);
    setError('');
    try {
      const reservationData = {
        ...data,
        userId: user.uid, // Add the user's ID to the reservation
        userEmail: user.email, // Add the user's email to the reservation
        guests: parseInt(data.guests),
        date: new Date(data.date),
        createdAt: new Date()
      };

      console.log('Data being sent to Firestore:', reservationData);

      const docRef = await addDoc(collection(db, 'reservations'), reservationData);
      console.log("Reservation saved with ID: ", docRef.id);
      navigate('/confirmation', { 
        state: { 
          ...data, 
          reservationId: docRef.id
        } 
      });
    } catch (error) {
      console.error("Full error object:", error);
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
          <ReservationForm onSubmit={handleReservation} userEmail={user.email} />
        )}
      </Box>
    </Container>
  );
}

export default Reservation;