import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

function Header() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log("Sign out button clicked");
    try {
      await signOut();
      console.log("Sign out successful");
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/contacts" className="nav-link">Contacts</Link>
            {currentUser && <Link to="/reservation" className="nav-link">Reservation</Link>}
          </div>
          <div className="auth-section">
            {currentUser ? (
              <>
                <span className="user-email">{currentUser.email}</span>
                <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/signin" className="nav-link">Sign In</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;