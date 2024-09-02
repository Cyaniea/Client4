import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function ReservationForm({ onSubmit }) {
  const { user } = useAuth(); // Get the current user

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    date: '',
  });

  useEffect(() => {
    // Pre-fill the email if the user is authenticated
    if (user && user.email) {
      setFormData(prevState => ({
        ...prevState,
        email: user.email
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        fullWidth
        label="Nama"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
        disabled={!!user} // Disable if user is authenticated
      />
      <TextField
        fullWidth
        label="Jumlah Tamu"
        name="guests"
        type="number"
        value={formData.guests}
        onChange={handleChange}
        margin="normal"
        required
        inputProps={{ min: 1 }}
      />
      <TextField
        fullWidth
        label="Tanggal Reservasi"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: new Date().toISOString().split('T')[0]
        }}
      />
      {formData.date && (
        <TextField
          fullWidth
          label="Tanggal Terpilih"
          value={formatDate(formData.date)}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      )}
      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary" 
        sx={{ mt: 3, mb: 2 }}
      >
        Buat Reservasi
      </Button>
    </Box>
  );
}

export default ReservationForm;