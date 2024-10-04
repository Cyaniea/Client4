import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardMedia, CardContent, Box } from '@mui/material';

// Impor gambar (sesuaikan path jika diperlukan)
import simpleWeddingImage from '../assets/images/p1.jpg';
import classicWeddingImage from '../assets/images/p2.jpeg';
import luxuryWeddingImage from '../assets/images/p3.jpg';

const packages = [
  {
    title: 'Paket Sederhana',
    description: 'Paket dasar untuk pernikahan intim',
    price: 'Rp 50.000.000',
    image: simpleWeddingImage,
    details: 'Paket ini mencakup: Venue untuk 50 tamu, Katering sederhana, Dekorasi dasar, Fotografer selama 4 jam'
  },
  {
    title: 'Paket Klasik',
    description: 'Pernikahan tradisional dengan sentuhan modern',
    price: 'Rp 100.000.000',
    image: classicWeddingImage,
    details: 'Paket ini mencakup: Venue untuk 100 tamu, Katering lengkap, Dekorasi mewah, Fotografer dan videografer full day, MC profesional'
  },
  {
    title: 'Paket Mewah',
    description: 'Pernikahan impian dengan kemewahan penuh',
    price: 'Rp 200.000.000',
    image: luxuryWeddingImage,
    details: 'Paket ini mencakup: Venue eksklusif untuk 200 tamu, Katering premium, Dekorasi ultra mewah, Tim dokumentasi lengkap, Entertainment, Wedding organizer full service'
  }
];

function PackageDetail() {
  const { id } = useParams();
  const packageIndex = parseInt(id);
  const packageData = packages[packageIndex];

  if (!packageData) {
    return <Typography>Paket tidak ditemukan</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={packageData.image}
          alt={packageData.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>{packageData.title}</Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>{packageData.price}</Typography>
          <Typography variant="body1" paragraph>{packageData.description}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Detail Paket:</Typography>
            <Typography variant="body1">{packageData.details}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PackageDetail;