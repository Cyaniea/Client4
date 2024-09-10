// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { Container, Typography, Box, Tab, Tabs } from '@mui/material';
import ReservationList from './ReservationList';
import UserManagement from './UserManagement';

function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Reservations" />
          <Tab label="User Management" />
        </Tabs>
      </Box>
      {tabValue === 0 && <ReservationList />}
      {tabValue === 1 && <UserManagement />}
    </Container>
  );
}

export default AdminDashboard;