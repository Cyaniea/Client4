import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/id';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase.js";

moment.locale('id');

const localizer = momentLocalizer(moment);

function ReservationCalendar({ onSelectDate, selectedDate }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const startOfMonth = moment().startOf('month').toDate();
      const endOfMonth = moment().endOf('month').toDate();

      const reservationsCol = collection(db, 'reservations');
      const q = query(reservationsCol, 
        where('date', '>=', startOfMonth),
        where('date', '<=', endOfMonth)
      );
      const reservationSnapshot = await getDocs(q);
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

  const handleSelectSlot = (slotInfo) => {
    const isReserved = events.some(event => 
      event.start.toDateString() === slotInfo.start.toDateString()
    );

    if (!isReserved) {
      onSelectDate(slotInfo.start);
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
        date={selectedDate}
        onNavigate={(date) => {
          // Fetch reservations for the new month when navigating
          const startOfMonth = moment(date).startOf('month').toDate();
          const endOfMonth = moment(date).endOf('month').toDate();
          fetchReservations(startOfMonth, endOfMonth);
        }}
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