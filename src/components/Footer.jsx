import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">
          © {new Date().getFullYear()} Graha Megatron
        </p>
      </div>
    </footer>
  );
}

export default Footer;