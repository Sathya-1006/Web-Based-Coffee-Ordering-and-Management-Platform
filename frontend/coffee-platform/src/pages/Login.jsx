import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // 1. Unified state: This ensures the data you type is actually captured
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

            // 2. Handle Success
            if (response.ok) {
                const user = await response.json();
                console.log("Login Success:", user);

                // Logic: Check the status returned from your backend User object
                if (user.status === "APPROVED") {
                    alert("First login detected. Please set your permanent password.");
                    navigate(`/set-password?email=${formData.email}`);
                } else {
                    alert("Welcome back!");
                    navigate('/home'); 
                }
            } 
            // 3. Handle 401 Unauthorized or other errors
            else {
                // Since your backend is sending plain text "Invalid email...", 
                // we use response.text() to prevent the "Unexpected token I" error
                const errorMsg = await response.text();
                alert(errorMsg); 
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Could not connect to the server. Please check if your Spring Boot app is running.");
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
            margin: 0
        },

        /* Add this inside the styles constant */
        backHome: {
            position: 'absolute',
            top: '30px',
            left: '30px',
            color: '#4B2C20',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '15px'
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
            boxSizing: 'border-box'
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
            marginTop: '25px'
        },
        link: {
            color: '#8D6E63',
            marginTop: '30px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'block',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
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
                    <button type="submit" style={styles.button}>Sign In</button>
                </form>
                        <div 
            style={styles.backHome} 
            onClick={() => navigate('/')}
        >
            ← Back to Home
        </div>
                <span style={styles.link} onClick={() => navigate('/signup')}>
                    Don't have an account? Sign Up
                </span>
            </div>
        </div>
    );
};

export default Login;