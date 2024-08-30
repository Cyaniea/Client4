import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/id';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from "../firebase/config.js";

moment.locale('id');

const localizer = momentLocalizer(moment);

function ReservationCalendar({ onSelectDate }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservationsCol = collection(db, 'reservations');
      const reservationSnapshot = await getDocs(reservationsCol);
      const reservationList = reservationSnapshot.docs.map(doc => ({
        start: doc.data().date.toDate(),
        end: doc.data().date.toDate(),
        title: 'Reserved',
      }));
      setEvents(reservationList);
    } catch (e) {
      console.error("Error fetching reservations: ", e);
      setError("Gagal mengambil data reservasi. Silakan coba lagi.");
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleSelectSlot = async (slotInfo) => {
    const isReserved = events.some(event => 
      event.start.toDateString() === slotInfo.start.toDateString()
    );

    if (!isReserved) {
      if (window.confirm(`Apakah Anda yakin ingin mereservasi tanggal ${formatDate(slotInfo.start)}?`)) {
        try {
          await addDoc(collection(db, 'reservations'), {
            date: slotInfo.start
          });
          onSelectDate(slotInfo.start);
          fetchReservations(); // Refresh events
        } catch (e) {
          console.error("Error adding reservation: ", e);
          setError("Gagal menambahkan reservasi. Silakan coba lagi.");
        }
      }
    } else {
      alert('Tanggal ini sudah direservasi.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        messages={{
          next: "Selanjutnya",
          previous: "Sebelumnya",
          today: "Hari Ini",
          month: "Bulan",
          week: "Minggu",
          day: "Hari"
        }}
      />
    </div>
  );
}

export default ReservationCalendar;