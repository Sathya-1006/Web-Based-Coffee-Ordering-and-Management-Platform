import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 60px',
      height: '80px', // Slimmer, elegant height
      backgroundColor: 'rgba(15, 15, 15, 0.85)', // Premium Onyx with transparency
      backdropFilter: 'blur(15px)', // High-end frosted glass effect
      color: '#FFFFFF',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000,
      boxSizing: 'border-box',
      borderBottom: '1px solid rgba(212, 175, 55, 0.2)', // Thin gold divider
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      gap: '10px'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '800',
      fontFamily: "'Playfair Display', serif",
      letterSpacing: '0.5px',
      color: '#FFFFFF'
    },
    navLinks: {
      display: 'flex',
      gap: '35px', // Spacious navigation as seen in reference
      alignItems: 'center',
    },
    navItem: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#E2D1C3', // Champagne Cream
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      letterSpacing: '0.5px'
    },
    btnContainer: { 
      display: 'flex', 
      gap: '12px', 
      alignItems: 'center' 
    },
    loginBtn: {
      padding: '10px 24px',
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'opacity 0.3s'
    },
    actionBtn: {
      padding: '10px 28px',
      // Gradient matching the luxury theme
      background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', 
      color: '#000000',
      border: 'none',
      borderRadius: '50px', // Perfect pill shape from reference
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
      transition: 'transform 0.2s ease'
    }
  };

  return (
    <header style={styles.header}>
      {/* Brand Logo */}
      <div style={styles.logoContainer} onClick={() => navigate('/')}>
        <span style={{fontSize: '24px'}}>☕</span>
        <span style={styles.logoText}>Bookafé</span>
      </div>

      {/* Navigation Links - Per your request */}
      <nav style={styles.navLinks}>
        <span style={styles.navItem} onClick={() => navigate('/')}>Home</span>
        <span style={styles.navItem}>About Us</span>
        <span style={styles.navItem}>How It Works</span>
        <span style={styles.navItem}>Contact Us</span>
      </nav>

      {/* Action Buttons */}
      <div style={styles.btnContainer}>
        <button 
          style={styles.loginBtn} 
          onClick={() => navigate('/login')}
          onMouseOver={(e) => e.target.style.opacity = '0.7'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          Login
        </button>
        <button 
          style={styles.actionBtn}
          onClick={() => navigate('/signup')}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

const handleScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Accounts for your fixed header height
      behavior: 'smooth'
    });
  }
};

export default Header;