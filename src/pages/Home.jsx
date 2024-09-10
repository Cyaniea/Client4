import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Import images
import heroImage from '../assets/images/images.png';
import simpleWeddingImage from '../assets/images/Java_Topography.png';
import classicWeddingImage from '../assets/images/Jawas.webp';
import luxuryWeddingImage from '../assets/images/peta-jawa-tengah_ratio-16x9.jpg';

// Wedding packages array
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
    <div className="home">
      <div className="container">
        <h1 className="home-title">Selamat Datang di Wedding Reservation</h1>
        <p className="home-subtitle">Wujudkan pernikahan impian Anda bersama kami</p>
        
        {/* Hero Image */}
        <div className="hero-image">
          <img src={heroImage} alt="Wedding Celebration" />
        </div>

        {/* CTA Button */}
        <div className="cta-button-container">
          <Link to="/reservation" className="cta-button">Buat Reservasi Sekarang</Link>
        </div>

        {/* Wedding Packages */}
        <h2 className="packages-title">Paket Pernikahan Kami</h2>
        <div className="packages-grid">
          {weddingPackages.map((pkg, index) => (
            <div key={index} className="package-card">
              <Link to={`/package/${index}`} className="package-link">
                <img src={pkg.image} alt={pkg.title} className="package-image" />
                <div className="package-content">
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-price">{pkg.price}</p>
                </div>
              </Link>
              <button className="package-detail-button">Lihat Detail</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;