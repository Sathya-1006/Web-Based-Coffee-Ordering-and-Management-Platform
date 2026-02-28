import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData) 
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));

            // 1. Handle First-Time Login (Status: APPROVED)
            if (user.status === "APPROVED") {
                alert("First login detected. Please set your permanent password.");
                navigate(`/set-password?email=${formData.email}`);
                return; 
            }

            // 2. FIXED ROLE-BASED ROUTING
            // We convert the role to lowercase to match "cafeowner" or "customer" safely
            const userRole = user.role ? user.role.toLowerCase() : '';

            if (userRole === 'cafeowner') {
                alert(`Welcome Cafe Owner, ${user.first_name}!`);
                navigate('/owner-profile'); 
            } else if (userRole === 'customer') {
                alert(`Welcome back, ${user.first_name}!`);
                navigate('/customer-profile');
            } else {
                // Fallback if role is missing or unknown
                navigate('/home');
            }

        } else {
            const errorMsg = await response.text();
            alert(errorMsg); 
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Connection failed. Is the Spring Boot server running?");
    }
};

    const styles = {
        container: {
            background: 'linear-gradient(135deg, #FDFCFB 0%, #E2D1C3 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            margin: 0,
            position: 'relative'
        },
        backHome: {
            position: 'absolute',
            top: '30px',
            left: '30px',
            color: '#4B2C20',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px',
            zIndex: 10
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '60px 50px',
            borderRadius: '30px',
            boxShadow: '0 30px 60px rgba(62, 39, 35, 0.12)',
            width: '420px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
        },
        title: { 
            color: '#2D1B14',
            marginBottom: '35px',
            fontSize: '34px',
            fontWeight: '800',
            fontFamily: "'Playfair Display', serif"
        },
        input: {
            width: '100%',
            padding: '16px 20px',
            margin: '10px 0',
            borderRadius: '15px',
            border: '1px solid #D7CCC8',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none'
        },
        button: {
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(to right, #4B2C20, #6F4E37)', 
            color: '#ffffff',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '17px',
            fontWeight: '700',
            marginTop: '25px',
            transition: 'transform 0.2s ease'
        },
        link: {
            color: '#8D6E63',
            marginTop: '30px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'block',
            fontWeight: '600'
        },
        forgotPassword: {
            color: '#8D6E63',
            fontSize: '13px',
            textAlign: 'right',
            display: 'block',
            marginTop: '5px',
            cursor: 'pointer',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.backHome} onClick={() => navigate('/')}>
                ← Back to Home
            </div>
            
            <div style={styles.card}>
                <h2 style={styles.title}>Bookafé Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        style={styles.input} 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        style={styles.input} 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                    
                    <span style={styles.forgotPassword} onClick={() => navigate('/reset-password')}>
                        Forgot Password?
                    </span>
                    
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Sign In
                    </button>
                </form>

                <span style={styles.link} onClick={() => navigate('/signup')}>
                    Don't have an account? Sign Up
                </span>
            </div>
        </div>
    );
};

export default Login;