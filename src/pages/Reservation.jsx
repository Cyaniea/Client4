import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ReservationForm from '../components/ReservationForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

function Reservation() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth(); // Use currentUser instead of user

  useEffect(() => {
    // Set loading to false once we know the auth state
    if (currentUser !== undefined) {
      setLoading(false);
    }
  }, [currentUser]);

  const handleReservation = async (data) => {
    setLoading(true);
    setError('');
    try {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const reservationData = {
        ...data,
        userId: currentUser.uid,
        userEmail: currentUser.email,
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

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Please sign in to make a reservation.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reservasi Pernikahan
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <ReservationForm onSubmit={handleReservation} userEmail={currentUser.email} />
      </Box>
    </Container>
  );
}

export default Reservation;