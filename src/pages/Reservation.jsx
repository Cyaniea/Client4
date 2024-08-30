import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import ReservationForm from '../components/ReservationForm';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Reservation({ db }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Reservation component mounted');
  }, []);

  const handleReservation = async (data) => {
    console.log('handleReservation called with data:', data);
    setLoading(true);
    setError('');
    try {
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
      console.error("Error saving reservation: ", error);
      setError('Terjadi kesalahan saat menyimpan reservasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
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
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <ReservationForm onSubmit={handleReservation} />
        )}
      </Container>
    </Box>
  );
}

export default Reservation;