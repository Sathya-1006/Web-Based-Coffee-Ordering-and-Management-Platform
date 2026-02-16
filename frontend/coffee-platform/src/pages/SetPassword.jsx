import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';


const SetPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email'); // Gets email from URL
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users/set-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email, 
                    password: newPassword 
                })
            });

            if (response.ok) {
                alert("Account activated successfully! Please login with your new password.");
                navigate('/login');
            } else {
                alert("Failed to update password. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed.");
        }
    };

    const styles = {
        container: { backgroundColor: '#FFF8F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
        formBox: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' },
        card: { backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
        input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ddd' },
        button: { width: '100%', padding: '12px', backgroundColor: '#4B2C20', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
        logo: {
            position: 'absolute',
            top: '30px',
            left: '40px',
            fontSize: '32px',
            fontWeight: '800',
            fontFamily: "'Playfair Display', serif",
            color: '#4B2C20',
            cursor: 'pointer',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            zIndex: 10
        },
    };

    return (
        <div style={styles.container}>
           
         <div style={styles.logo} onClick={() => navigate('/')}>
            Bookafé
        </div>

            <div style={styles.formBox}>
                <form style={styles.card} onSubmit={handlePasswordUpdate}>
                    <h2 style={{ color: '#4B2C20', marginBottom: '20px' }}>Set Permanent Password</h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>Email: {email}</p>
                    
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        required 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={styles.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                    
                    <button type="submit" style={styles.button}>Activate Account</button>
                </form>
            </div>
            
        </div>
    );
};

export default SetPassword;