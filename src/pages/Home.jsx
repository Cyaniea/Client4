import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, CardActionArea} from '@mui/material';
import { Link } from 'react-router-dom';


// Impor gambar
import heroImage from '../assets/images/images.png';
import simpleWeddingImage from '../assets/images/Java_Topography.png';
import classicWeddingImage from '../assets/images/Jawas.webp';
import luxuryWeddingImage from '../assets/images/peta-jawa-tengah_ratio-16x9.jpg';

// Array paket pernikahan
const weddingPackages = [
  {
    title: 'Paket Sederhana',
    description: 'Paket dasar untuk pernikahan intim',
    price: 'Rp 50.000.000',
    image: simpleWeddingImage
  },
  {
    title: 'Paket Klasik',
    description: 'Pernikahan tradisional dengan sentuhan modern',
    price: 'Rp 100.000.000',
    image: classicWeddingImage
  },
  {
    title: 'Paket Mewah',
    description: 'Pernikahan impian dengan kemewahan penuh',
    price: 'Rp 200.000.000',
    image: luxuryWeddingImage
  }
];

function Home() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Selamat Datang di Wedding Reservation
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Wujudkan pernikahan impian Anda bersama kami
        </Typography>
        
        {/* Hero Image */}
        <Box sx={{ my: 4 }}>
          <img 
            src={heroImage}
            alt="Wedding Celebration" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>

        {/* CTA Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button variant="contained" color="primary" size="large" component={Link} to="/reservation">
            Buat Reservasi Sekarang
          </Button>
        </Box>

        {/* Wedding Packages */}
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          Paket Pernikahan Kami
        </Typography>
        <Grid container spacing={4}>
          {weddingPackages.map((pkg, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardActionArea component={Link} to={`/package/${index}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={pkg.image}
                    alt={pkg.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {pkg.title}
                    </Typography>
                    <Typography>
                      {pkg.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {pkg.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button size="small" color="primary" sx={{ m: 2 }}>
                  Lihat Detail
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
