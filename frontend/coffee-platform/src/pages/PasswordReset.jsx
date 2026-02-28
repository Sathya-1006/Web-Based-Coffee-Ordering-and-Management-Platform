import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: New Password
  const [email, setEmail] = useState('');
  const [passwordData, setPasswordData] = useState({ newPass: '', confirmPass: '' });

  // STEP 1: Handle sending the request (or simulating link sent)
  const handleRequestLink = (e) => {
    e.preventDefault();
    // In a real app, this sends an email. For now, we move to the next step
    alert(`Reset link sent to ${email} (Simulated)`);
    setStep(2);
  };

  // STEP 2: Handle actual Database Update
  const handleReset = async (e) => {
    e.preventDefault();

    if (passwordData.newPass !== passwordData.confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Calling your existing set-password endpoint
      const response = await fetch('http://localhost:8080/users/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: passwordData.newPass
        })
      });

      if (response.ok) {
        alert("Password updated in database successfully!");
        navigate('/login');
      } else {
        const error = await response.text();
        alert(error || "Failed to update password.");
      }
    } catch (err) {
      alert("Connection error. Is Spring Boot running?");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FFF8F0' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(62, 39, 35, 0.1)', width: '380px' }}>
        <h2 style={{ color: '#4B2C20', textAlign: 'center', fontFamily: "'Playfair Display', serif" }}>
          {step === 1 ? "Forgot Password" : "Set New Password"}
        </h2>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          {step === 1 ? "Enter your registered email to receive a reset link." : "Please set your new secure password."}
        </p>

        {step === 1 ? (
          <form onSubmit={handleRequestLink}>
            <input 
              type="email" 
              placeholder="Email Address" 
              style={inputStyle} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <button type="submit" style={buttonStyle}>Send Reset Link</button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <input 
              type="password" 
              placeholder="New Password" 
              style={inputStyle} 
              value={passwordData.newPass}
              onChange={(e) => setPasswordData({...passwordData, newPass: e.target.value})}
              required 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              style={inputStyle} 
              value={passwordData.confirmPass}
              onChange={(e) => setPasswordData({...passwordData, confirmPass: e.target.value})}
              required 
            />
            <button type="submit" style={buttonStyle}>Update & Login</button>
          </form>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span onClick={() => navigate('/login')} style={{ fontSize: '13px', color: '#8D6E63', cursor: 'pointer', fontWeight: '600' }}>
                Back to Login
            </span>
        </div>
      </div>
    </div>
  );
};

// Internal styles for clean code
const inputStyle = { width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #D7CCC8', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '14px', backgroundColor: '#4B2C20', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' };

export default PasswordReset;