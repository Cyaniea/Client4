import React, { useState } from 'react'; // Add useState to the import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Confirmation from './pages/Confirmation';
import Contacts from './pages/Contacts';
import PackageDetail from './pages/PackageDetail';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import theme from './theme';
import { db } from './firebase';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Snackbar } from '@mui/material';

function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reservation" element={<PrivateRoute><Reservation db={db} /></PrivateRoute>} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/package/:id" element={<PackageDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;