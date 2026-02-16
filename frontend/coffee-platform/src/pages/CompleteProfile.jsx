import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    college: '',
    studentId: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile 100% Completed! You can now explore cafés.");
    navigate('/dashboard'); // We'll create the Customer Dashboard later
  };

  const styles = {
    container: { backgroundColor: '#FFF8F0', minHeight: '100vh' },
    formBox: {
      maxWidth: '600px',
      margin: '100px auto',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      border: '1px solid #A67B5B'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '6px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4B2C20',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formBox}>
        <h2 style={{ color: '#4B2C20' }}>Complete Your Profile</h2>
        <p style={{ color: '#6F4E37' }}>As per security rules, please provide your academic and address details.</p>
        
        <form onSubmit={handleSubmit}>
          <h4 style={{ marginBottom: '5px' }}>Academic Information</h4>
          <input type="text" placeholder="College/University Name" style={styles.input} required />
          <input type="text" placeholder="Student/Employee ID" style={styles.input} required />

          <h4 style={{ marginBottom: '5px', marginTop: '15px' }}>Address Details</h4>
          <textarea placeholder="Full Address" style={{ ...styles.input, height: '80px' }} required></textarea>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="City" style={styles.input} required />
            <input type="text" placeholder="Pincode" style={styles.input} required />
          </div>

          <button type="submit" style={styles.button}>Save & Continue</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile;