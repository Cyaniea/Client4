// src/services/activityLogger.js
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export async function logActivity(userId, action, details = {}) {
  try {
    await addDoc(collection(db, 'userActivities'), {
      userId,
      action,
      details,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}