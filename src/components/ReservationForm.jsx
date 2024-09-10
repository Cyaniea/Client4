import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ReservationCalendar from './Calendar';
import ConfirmationModal from './ConfirmationModal';
import { logActivity } from '../services/activityLogger';
import '../styles/ReservationForm.css';

function ReservationForm({ onSubmit }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    date: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
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
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid";
    tempErrors.guests = formData.guests > 0 ? "" : "Number of guests must be greater than 0";
    tempErrors.date = formData.date ? "" : "Please select a date";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmationModalOpen(true);
    }
  };

  const handleConfirmReservation = async () => {
    setConfirmationModalOpen(false);
    setIsLoading(true);
    try {
      await onSubmit(formData);
      setSnackbar({ open: true, message: 'Reservation successful!', severity: 'success' });
      setFormData({ name: '', email: user?.email || '', guests: '', date: null });
    } catch (error) {
      console.error('Reservation error:', error);
      setSnackbar({ open: true, message: 'Failed to make reservation. Please try again.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setFormData(prevState => ({
      ...prevState,
      date: date
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      date: ''
    }));
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!!user || isLoading}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Jumlah Tamu</label>
        <input
          id="guests"
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          min="1"
          disabled={isLoading}
          className={errors.guests ? 'error' : ''}
        />
        {errors.guests && <span className="error-message">{errors.guests}</span>}
      </div>

      <ReservationCalendar 
        onSelectDate={handleDateSelect} 
        selectedDate={formData.date}
        disabled={isLoading}
      />
      {errors.date && <span className="error-message">{errors.date}</span>}

      {formData.date && (
        <div className="form-group">
          <label>Tanggal Terpilih</label>
          <input
            type="text"
            value={new Intl.DateTimeFormat('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(formData.date)}
            readOnly
          />
        </div>
      )}

      <button 
        type="submit" 
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Buat Reservasi'}
      </button>
      
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={handleConfirmReservation}
        reservationDetails={formData}
      />
      
      {snackbar.open && (
        <div className={`snackbar ${snackbar.severity}`}>
          {snackbar.message}
          <button onClick={() => setSnackbar({ ...snackbar, open: false })}>Close</button>
        </div>
      )}
    </form>
  );
}

export default ReservationForm;