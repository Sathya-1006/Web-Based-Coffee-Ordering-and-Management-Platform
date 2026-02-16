import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignupChoice = () => {
    const navigate = useNavigate();

    const styles = {
        container: { 
            // Aesthetic coffee shop background image
            backgroundImage: `linear-gradient(rgba(255, 248, 240, 0.85), rgba(255, 248, 240, 0.85)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            fontFamily: "'Poppins', sans-serif"
        },
        logo: {
            position: 'absolute',
            top: '40px',
            left: '50px',
            fontSize: '36px',
            fontWeight: '800',
            fontFamily: "'Playfair Display', serif",
            color: '#4B2C20',
            cursor: 'pointer',
            letterSpacing: '1px',
            zIndex: 10
        },
        closeBtn: { 
            position: 'absolute', 
            top: '40px', 
            right: '50px', 
            fontSize: '32px', 
            cursor: 'pointer', 
            color: '#4B2C20',
            zIndex: 10 
        },
        content: { 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '40px' 
        },
        cardContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '50px',
            marginTop: '20px'
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
            width: '350px', // Increased width
            height: '450px', // Increased height
            padding: '0', // Set to 0 to allow image to hit edges if desired, or keep for padding
            borderRadius: '25px', 
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(75, 44, 32, 0.15)', 
            cursor: 'pointer', 
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            overflow: 'hidden', // Keeps images within rounded corners
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(255, 255, 255, 0.3)'
        },
        cardImage: {
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            marginBottom: '20px'
        },
        cardBody: {
            padding: '0 30px 30px 30px'
        },
        title: { 
            color: '#4B2C20', 
            marginBottom: '15px', 
            fontSize: '28px',
            fontWeight: '700' 
        },
        desc: { 
            color: '#6F4E37', 
            fontSize: '16px', 
            lineHeight: '1.6',
            marginBottom: '20px' 
        },
        loginLink: { 
            marginTop: '40px', 
            color: '#4B2C20', 
            fontSize: '15px', 
            cursor: 'pointer', 
            fontWeight: '600',
            textDecoration: 'none',
            borderBottom: '2px solid #4B2C20',
            paddingBottom: '2px'
        }
    };

    return (
        <div style={styles.container}>
            {/* Logo */}
            <div style={styles.logo} onClick={() => navigate('/')}>
                Bookafé
            </div>

            {/* Close Button */}
            <span style={styles.closeBtn} onClick={() => navigate('/')}>&times;</span>
            
            <div style={styles.content}>
                <h1 style={{color: '#4B2C20', marginBottom: '50px', fontSize: '38px', fontWeight: '800'}}>Join our Community</h1>
                
                <div style={styles.cardContainer}>
                    {/* Customer Card */}
                    <div style={styles.card} 
                         onClick={() => navigate('/signup-customer')}
                         onMouseOver={(e) => {
                             e.currentTarget.style.transform = 'translateY(-15px)';
                             e.currentTarget.style.boxShadow = '0 30px 60px rgba(75, 44, 32, 0.25)';
                         }}
                         onMouseOut={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = styles.card.boxShadow;
                         }}>
                        <img 
                            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop" 
                            alt="Customer" 
                            style={styles.cardImage} 
                        />
                        <div style={styles.cardBody}>
                            <h2 style={styles.title}>Customer</h2>
                            <p style={styles.desc}>Sip, relax, and earn rewards. Your favorite brew is just a tap away.</p>
                        </div>
                    </div>

                    {/* Cafe Owner Card */}
                    <div style={styles.card} 
                         onClick={() => navigate('/signup-cafe')}
                         onMouseOver={(e) => {
                             e.currentTarget.style.transform = 'translateY(-15px)';
                             e.currentTarget.style.boxShadow = '0 30px 60px rgba(75, 44, 32, 0.25)';
                         }}
                         onMouseOut={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = styles.card.boxShadow;
                         }}>
                        <img 
                            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop" 
                            alt="Cafe Owner" 
                            style={styles.cardImage} 
                        />
                        <div style={styles.cardBody}>
                            <h2 style={styles.title}>Cafe Owner</h2>
                            <p style={styles.desc}>Put your cafe on the map. Manage your menu and reach coffee lovers easily.</p>
                        </div>
                    </div>
                </div>

                <div style={{marginTop: '20px'}}>
                    <p style={styles.loginLink} onClick={() => navigate('/login')}>
                        Already have an account? Login here
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupChoice;