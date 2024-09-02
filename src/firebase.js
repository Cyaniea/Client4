import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBK4Wd2r5kLoetkiqpWloZ1Gz-6lSXlNQY",
  authDomain: "client4-18595.firebaseapp.com",
  projectId: "client4-18595",
  storageBucket: "client4-18595.appspot.com",
  messagingSenderId: "832209194314",
  appId: "1:832209194314:web:e57c9d765d23fd914d85b3",
  measurementId: "G-KPS0J7DN30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };