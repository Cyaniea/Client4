// src/components/ReservationList.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservationsCol = collection(db, 'reservations');
      const reservationSnapshot = await getDocs(reservationsCol);
      const reservationList = reservationSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReservations(reservationList);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setEditFormData(reservation);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async () => {
    try {
      const reservationRef = doc(db, 'reservations', editingReservation.id);
      await updateDoc(reservationRef, editFormData);
      setReservations(reservations.map(res => 
        res.id === editingReservation.id ? { ...res, ...editFormData } : res
      ));
      setEditingReservation(null);
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await deleteDoc(doc(db, 'reservations', id));
        setReservations(reservations.filter(res => res.id !== id));
      } catch (error) {
        console.error("Error cancelling reservation:", error);
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.email}</TableCell>
                <TableCell>{reservation.date.toDate().toLocaleDateString()}</TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>
                  <Button size="small" color="primary" onClick={() => handleEdit(reservation)}>Edit</Button>
                  <Button size="small" color="secondary" onClick={() => handleCancel(reservation.id)}>Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editingReservation} onClose={() => setEditingReservation(null)}>
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editFormData.name || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={editFormData.email || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="guests"
            label="Guests"
            type="number"
            fullWidth
            value={editFormData.guests || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={editFormData.date ? editFormData.date.toDate().toISOString().split('T')[0] : ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingReservation(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReservationList;