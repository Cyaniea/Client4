import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

function Confirmation() {
  const location = useLocation();
  const reservationData = location.state;

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
          <Typography variant="body1">Tanggal: {reservationData.date}</Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Terima kasih atas reservasi Anda. Kami akan menghubungi Anda segera untuk konfirmasi lebih lanjut.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Confirmation;
