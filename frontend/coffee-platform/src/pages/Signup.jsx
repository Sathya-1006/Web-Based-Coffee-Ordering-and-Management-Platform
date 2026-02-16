import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    role: 'Customer',
    email: '',
    password: '',
    govtProof: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, govtProof: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Create FormData object (required for file uploads)
  const data = new FormData();
  data.append('firstName', formData.firstName);
  data.append('lastName', formData.lastName);
  data.append('dob', formData.dob);
  data.append('gender', formData.gender);
  data.append('role', formData.role);
  data.append('email', formData.email);
  data.append('password', formData.password);
  data.append('govtProof', formData.govtProof); // The file object

  try {
    // 2. Call your Spring Boot endpoint
    const response = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      body: data, 
      // Important: Do NOT set 'Content-Type' header manually when using FormData.
      // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result);
      // 3. Move to the waiting page
      navigate('/waiting');
    } else {
      const errorData = await response.json();
      alert(`Registration Failed: ${errorData.message || 'Check your details'}`);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Could not connect to the server. Is Spring Boot running?");
  }
};

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FFF8F0',
    },
    formSection: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 20px 40px 20px', // Top padding for fixed header
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(75, 44, 32, 0.1)',
      width: '100%',
      maxWidth: '500px',
      border: '1px solid #A67B5B'
    },
    title: { color: '#4B2C20', textAlign: 'center', marginBottom: '20px' },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    inputGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontSize: '14px', color: '#6F4E37', fontWeight: 'bold' },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #A67B5B',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4B2C20',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.formSection}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input type="text" name="firstName" style={styles.input} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input type="text" name="lastName" style={styles.input} onChange={handleChange} required />
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input type="date" name="dob" style={styles.input} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Gender</label>
                <select name="gender" style={styles.input} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Role</label>
              <select name="role" style={styles.input} onChange={handleChange} required>
                <option value="Customer">Customer</option>
                <option value="Cafe Owner">Café Owner</option>
                <option value="Chef">Chef</option>
                <option value="Waiter">Waiter</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input type="email" name="email" style={styles.input} onChange={handleChange} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" name="password" style={styles.input} onChange={handleChange} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Government Proof (PDF/JPG)</label>
              <input type="file" accept=".pdf, .jpg, .jpeg" style={styles.input} onChange={handleFileChange} required />
            </div>

            <button type="submit" style={styles.button}>Register Account</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;