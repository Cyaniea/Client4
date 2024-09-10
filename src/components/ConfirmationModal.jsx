// src/components/ConfirmationModal.jsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

function ConfirmationModal({ open, onClose, onConfirm, reservationDetails }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konfirmasi Reservasi</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah Anda yakin ingin membuat reservasi dengan detail berikut?
        </DialogContentText>
        <DialogContentText>
          Nama: {reservationDetails.name}
        </DialogContentText>
        <DialogContentText>
          Email: {reservationDetails.email}
        </DialogContentText>
        <DialogContentText>
          Jumlah Tamu: {reservationDetails.guests}
        </DialogContentText>
        <DialogContentText>
          Tanggal: {formatDate(reservationDetails.date)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Batal
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Konfirmasi
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;