import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactRef = useRef(null);
  const form = useRef();
  
  
  // State for Email status
  const [status, setStatus] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => scrollToSection(id), 100);
    }
  }, [location]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // Replace these placeholder strings with your actual EmailJS credentials
    emailjs.sendForm(
      'service_kjtxbds', 
      'template_hibqjyp', 
      form.current, 
      'YmavBiXHE0bBWaxnt'
    )
    .then((result) => {
        setStatus('Message sent successfully! We will contact you soon.');
        e.target.reset(); // Clears the form
    }, (error) => {
        setStatus('Failed to send. Please try again.');
        console.log(error.text);
    });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#4c3c34', // Deep Roast Brown
      width: '100%',
      overflowX: 'hidden',
    },
    mainContent: {
      display: 'flex',
      marginTop: '70px',
      width: '100%',
      minHeight: 'calc(100vh - 70px)',
      flexWrap: 'wrap',
    },
    sidebar: {
      flex: '1.2',
      backgroundColor: '#ffffff', // Warm Linen
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 60px',
      color: '#4c3c34',
      textAlign: 'left',
      minWidth: '350px',
    },
    brandTag: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      color: '#a27c5c', // Muted Caramel
      marginBottom: '20px',
      fontWeight: '700'
    },
    title: {
      fontSize: '4.5rem',
      lineHeight: '1',
      marginBottom: '20px',
      fontFamily: "'Playfair Display', serif",
      color: '#5c4128', // Espresso Brown
    },
    subtitle: {
      fontSize: '1.1rem',
      maxWidth: '400px',
      marginBottom: '40px',
      lineHeight: '1.7',
      color: '#5c4128', 
      opacity: 0.85,
    },
    imagePanel: {
      flex: '1',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '40px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      borderLeft: '1px solid rgba(203, 188, 178, 0.2)'
    },
    panelLabel: {
      color: '#cbbcb2',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      fontWeight: '600',
      writingMode: 'vertical-lr',
      transform: 'rotate(180deg)',
      position: 'absolute',
      top: '40px',
      right: '20px',
      opacity: 0.9
    },
    button: {
      padding: '18px 45px',
      backgroundColor: '#5c4128', // Dark Coffee
      color: '#d1b49c', // Latte
      border: 'none',
      borderRadius: '0px',
      cursor: 'pointer',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: 'bold',
      transition: '0.3s',
      width: 'fit-content'
    },
    aboutSection: {
      padding: '120px 80px',
      backgroundColor: '#4c3c34', // Deep Roast Brown
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '60px'
    },
    aboutText: {
      flex: '1',
      fontFamily: "'Playfair Display', serif",
      fontSize: '2.5rem',
      lineHeight: '1.2',
      color: '#cbbcb2'
    },
    aboutSub: {
      flex: '1',
      fontSize: '1.1rem',
      color: '#d1b49c',
      lineHeight: '1.8',
      borderLeft: '2px solid #a27c5c',
      paddingLeft: '30px'
    },
    roadmapStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '30%'
    },
    roadmapLine: {
      height: '2px',
      flex: '1',
      borderTop: '2px dashed #a27c5c',
      margin: '0 20px',
      marginTop: '40px',
      opacity: 0.4
    },
    contactContainer: {
      position: 'relative',
      width: '100%',
      minHeight: '80vh',
      backgroundImage: `url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
    },
    contactOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(76, 60, 52, 0.8)', // Deep Roast Overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactCard: {
      backgroundColor: '#cbbcb2', // Warm Linen Card
      width: '100%',
      maxWidth: '900px',
      display: 'flex',
      borderRadius: '4px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      zIndex: 2,
    },
    contactFormLeft: {
      flex: 1,
      padding: '60px',
      borderRight: '1px solid #d1b49c',
    },
    contactFormRight: {
      flex: 1.2,
      padding: '60px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#caa383', // Slightly darker section for contrast
    },
    contactTitle: {
      fontFamily: "'Playfair Display', serif",
      fontSize: '2.5rem',
      color: '#5c4128',
      marginBottom: '40px',
    },
    inputGroup: {
      marginBottom: '25px',
    },
    inputLabel: {
      display: 'block',
      fontSize: '12px',
      color: '#5c4128',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '600'
    },
    contactInput: {
      width: '100%',
      padding: '10px 0',
      border: 'none',
      backgroundColor: 'transparent',
      borderBottom: '1px solid #a27c5c',
      fontSize: '16px',
      color: '#4c3c34',
      outline: 'none',
    },
    contactTextarea: {
      width: '100%',
      height: '200px',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '16px',
      color: '#4c3c34',
      resize: 'none',
      outline: 'none',
      paddingTop: '10px'
    },
    submitBtn: {
      padding: '12px 40px',
      backgroundColor: '#5c4128', // Espresso
      color: '#ffffff', // Linen
      border: 'none',
      borderRadius: '2px',
      cursor: 'pointer',
      fontWeight: 'bold',
      letterSpacing: '2px',
      transition: '0.3s',
    },
  };
  return (
    <div style={styles.container} id="home">
      <Header onNavClick={scrollToSection} />
      
      <main style={styles.mainContent}>
        <section style={styles.sidebar}>
          <span style={styles.brandTag}>Est. 2026</span>
          <h1 style={styles.title}>Bookafé</h1>
          <p style={styles.subtitle}>
            A happy little digital hideaway for the modern connoisseur. Pre-order yummy artisan blends and save your favorite table—ready and waiting just for you.
          </p>
          <button 
            style={styles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#D4AF37'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1A1A1A'}
            onClick={() => navigate('/signup')}
          >
            Reserve Now
          </button>
        </section>

        <div 
          style={{...styles.imagePanel, backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000')`}}
          onMouseOver={(e) => e.target.style.flex = '1.5'}
          onMouseOut={(e) => e.target.style.flex = '1'}
        >
          <span style={styles.panelLabel}>Artisan Brews</span>
        </div>

        <div 
  style={{
    ...styles.imagePanel, 
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&q=80&w=1000')`
  }}
  onMouseOver={(e) => e.target.style.flex = '1.5'}
  onMouseOut={(e) => e.target.style.flex = '1'}
>
  <span style={styles.panelLabel}>Private Tables</span>
</div>

        <div 
          style={{...styles.imagePanel, backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000')`}}
          onMouseOver={(e) => e.target.style.flex = '1.5'}
          onMouseOut={(e) => e.target.style.flex = '1'}
        >
          <span style={styles.panelLabel}>Chef's Special</span>
        </div>
      </main>

      <section id="about" style={styles.aboutSection}>
        <div style={styles.aboutText}>
          Crafting <span style={{color: '#D4AF37', italic: 'true'}}>Digital</span> <br/> 
          Cafe Cultures Since 2026 ☕
        </div>
        <div style={styles.aboutSub}>
          Bookafé was brewed with love for the modern connoisseur. We believe your coffee experience should be as smooth, joyful, and satisfying as that first sip of a perfectly pulled espresso. By blending the magic of artisan craftsmanship with a sprinkle of digital wizardry, we make sure your favorite spot is always saved, smiling, and waiting just for you.
        </div>
      </section>

      <section id="how-it-works" style={{padding: '100px 80px', backgroundColor: '#161616'}}>
        <h2 style={{color: '#D4AF37', textAlign: 'center', marginBottom: '80px', fontSize: '2rem'}}>The Bookafé Journey</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          <div style={styles.roadmapStep}>
            <div style={{fontSize: '4rem', color: 'rgba(212, 175, 55, 0.1)', marginBottom: '-30px', fontWeight: '900'}}>01</div>
            <div style={{backgroundColor: '#D4AF37', padding: '15px', borderRadius: '50%', marginBottom: '20px'}}>🔍</div>
            <h3 style={{color: '#FFFFFF'}}>Reserve & Pre-order</h3>
            <p style={{color: '#A1A1A1', fontSize: '0.9rem'}}>Customers find their favorite table and order via the app before arrival.</p>
          </div>
          <div style={styles.roadmapLine}></div>
          <div style={styles.roadmapStep}>
            <div style={{fontSize: '4rem', color: 'rgba(212, 175, 55, 0.1)', marginBottom: '-30px', fontWeight: '900'}}>02</div>
            <div style={{backgroundColor: '#D4AF37', padding: '15px', borderRadius: '50%', marginBottom: '20px'}}>🍳</div>
            <h3 style={{color: '#FFFFFF'}}>Instant Kitchen Sync</h3>
            <p style={{color: '#A1A1A1', fontSize: '0.9rem'}}>Chefs receive orders instantly, allowing them to prepare fresh meals exactly on time.</p>
          </div>
          <div style={styles.roadmapLine}></div>
          <div style={styles.roadmapStep}>
            <div style={{fontSize: '4rem', color: 'rgba(212, 175, 55, 0.1)', marginBottom: '-30px', fontWeight: '900'}}>03</div>
            <div style={{backgroundColor: '#D4AF37', padding: '15px', borderRadius: '50%', marginBottom: '20px'}}>🤵</div>
            <h3 style={{color: '#FFFFFF'}}>Seamless Service</h3>
            <p style={{color: '#A1A1A1', fontSize: '0.9rem'}}>Waiters are notified for table service, completing the circle of premium hospitality.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section with Email Functionality */}
      <section id="contact" ref={contactRef} style={styles.contactContainer}>
        <div style={styles.contactOverlay}>
          <form ref={form} onSubmit={sendEmail} style={styles.contactCard}>
            <div style={styles.contactFormLeft}>
              <h2 style={styles.contactTitle}>Contact Us</h2>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Name</label>
                <input type="text" name="user_name" required placeholder="John Smith" style={styles.contactInput} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>E-mail</label>
                <input type="email" name="user_email" required placeholder="info.sathya07@gmail.com" style={styles.contactInput} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Phone</label>
                <input type="text" name="user_phone" placeholder="+91 XXX-XXX-XXXX" style={styles.contactInput} />
              </div>
            </div>
            <div style={styles.contactFormRight}>
              <label style={styles.inputLabel}>Message</label>
              <textarea name="message" required placeholder="Write text here..." style={styles.contactTextarea}></textarea>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '20px' }}>
                <button 
                  type="submit"
                  style={styles.submitBtn}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#B8860B'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#D4AF37'}
                >
                  SUBMIT
                </button>
                {status && <p style={{color: status.includes('success') ? '#D4AF37' : '#ff4d4d', fontSize: '14px', marginTop: '10px'}}>{status}</p>}
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer onNavClick={scrollToSection} />
    </div>
  );
};

export default Home;