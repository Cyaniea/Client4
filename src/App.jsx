import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Confirmation from './pages/Confirmation';
import Contacts from './pages/Contacts';
import PackageDetail from './pages/PackageDetail';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import { db } from './firebase';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './App.css'; // This is correct as App.css is in the same directory as App.jsx

function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };
  
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/reservation" 
                element={
                  <PrivateRoute>
                    <Reservation db={db} handleSnackbar={handleSnackbar} />
                  </PrivateRoute>
                } 
              />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/package/:id" element={<PackageDetail />} />
              <Route path="/signin" element={<SignIn handleSnackbar={handleSnackbar} />} />
              <Route path="/signup" element={<SignUp handleSnackbar={handleSnackbar} />} />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute>
                    <AdminDashboard handleSnackbar={handleSnackbar} />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      {snackbar.open && (
        <div className={`snackbar ${snackbar.severity}`}>
          {snackbar.message}
          <button onClick={() => setSnackbar({ ...snackbar, open: false })}>Close</button>
        </div>
      )}
    </AuthProvider>
  );
}

export default App;