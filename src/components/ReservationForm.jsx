import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function ReservationForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, guests });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Jumlah Tamu"
        type="number"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        margin="normal"
        required
        InputProps={{ inputProps: { min: 1 } }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Reservasi
      </Button>
    </Box>
  );
}

export default ReservationForm;
