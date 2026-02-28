import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = ({ onNavClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    footer: {
      backgroundColor: '#121212', // Premium Matte Black
      color: '#FFFFFF',
      padding: '60px 80px 30px 80px', 
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: "'Inter', sans-serif",
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
    },
    topSection: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', // 4-column reference
      gap: '40px',
      maxWidth: '1300px',
      margin: '0 auto 40px auto',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    brandCard: {
      backgroundColor: '#FFFFFF', 
      padding: '20px',
      borderRadius: '12px',
      width: 'fit-content',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    brandName: {
      color: '#121212',
      fontSize: '24px',
      fontWeight: '900',
      letterSpacing: '-1px',
    },
    description: {
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#A1A1A1',
      maxWidth: '280px',
    },
    colTitle: {
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: '800',
      color: '#D4AF37', // Gold highlight
      marginBottom: '15px',
    },
    link: {
      fontSize: '14px',
      color: '#FFFFFF',
      textDecoration: 'none',
      opacity: 0.7,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontWeight: '500'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'start',
      gap: '12px',
      fontSize: '14px',
      color: '#FFFFFF',
      opacity: 0.8,
      lineHeight: '1.5'
    },
    icon: {
      color: '#D4AF37',
      fontSize: '16px'
    },
    bottomBar: {
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '30px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#666666',
    }
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    // If on Home page, scroll. Otherwise, navigate home with hash.
    if (location.pathname === '/') {
      onNavClick(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        {/* Brand Section */}
        <div style={styles.column}>
          <div style={styles.brandCard}>
            <span style={styles.brandName}>Bookafé</span>
          </div>
          <p style={styles.description}>
            Bringing you a seamless, global cafe experience delivered with artisan precision.
          </p>
          <div style={{display: 'flex', gap: '15px', marginTop: '10px'}}>
            <span style={{...styles.icon, backgroundColor: '#D4AF37', color: '#121212', padding: '8px', borderRadius: '50%', cursor: 'pointer'}}>IG</span>
            <span style={{...styles.icon, backgroundColor: '#D4AF37', color: '#121212', padding: '8px', borderRadius: '50%', cursor: 'pointer'}}>FB</span>
            <span style={{...styles.icon, backgroundColor: '#D4AF37', color: '#121212', padding: '8px', borderRadius: '50%', cursor: 'pointer'}}>TW</span>
          </div>
        </div>

        {/* Quick Links - NOW FULLY WORKING */}
        <div style={styles.column}>
          <div style={styles.colTitle}>Quick Links</div>
          <span style={styles.link} onClick={(e) => handleLinkClick(e, 'home')}>Home</span>
          <span style={styles.link} onClick={(e) => handleLinkClick(e, 'about')}>About Us</span>
          <span style={styles.link}>Features</span>
          <span style={styles.link} onClick={(e) => handleLinkClick(e, 'how-it-works')}>How it Works</span>
          <span style={styles.link}>Blogs</span>
        </div>

        {/* Support/Platform */}
        <div style={styles.column}>
          <div style={styles.colTitle}>Platform</div>
          <span style={styles.link} onClick={() => navigate('/signup')}>Customer</span>
          <span style={styles.link} onClick={() => navigate('/signup')}>Cafe Owner</span>
          <span style={styles.link} onClick={() => navigate('/admin-portal')}>Admin</span>
          <span style={styles.link}>Privacy Policy</span>
          <span style={styles.link}>Terms</span>
        </div>

        {/* Contact Us */}
        <div style={styles.column}>
          <div style={styles.colTitle}>Contact Us</div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📍</span>
            <span>Sholinganallur, Tamil Nadu<br/>Chennai District, 600119</span>
          </div>
          <div style={styles.contactItem} onClick={(e) => handleLinkClick(e, 'contact')}>
            <span style={styles.icon}>✉️</span>
            <span style={{cursor: 'pointer'}}>info.sathya07@gmail.com</span>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📞</span>
            <span>+91 9791449077</span>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        © 2026 Bookafé. All rights reserved. Crafted with ❤️ for coffee lovers.
      </div>
    </footer>
  );
};

export default Footer;