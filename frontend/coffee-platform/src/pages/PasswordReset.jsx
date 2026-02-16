import React from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("Password updated successfully! You can now log in.");
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FFF8F0' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ color: '#4B2C20', textAlign: 'center' }}>Reset Password</h2>
        <p style={{ fontSize: '14px', textAlign: 'center', color: '#666' }}>Please set your new secure password.</p>
        <form onSubmit={handleReset}>
          <input type="password" placeholder="New Password" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #A67B5B' }} required />
          <input type="password" placeholder="Confirm Password" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #A67B5B' }} required />
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4B2C20', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Update & Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;