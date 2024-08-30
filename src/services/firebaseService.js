// src/services/firebaseService.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveReservation = async (reservationData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), reservationData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};