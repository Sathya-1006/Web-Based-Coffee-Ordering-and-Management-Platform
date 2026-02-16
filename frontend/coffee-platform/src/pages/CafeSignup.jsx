import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CafeSignup = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        dob: '', 
        gender: '', 
        phoneNumber: '',
        email: '', 
        role: 'CafeOwner', // Role is set to CafeOwner
        password: '',
        street: '',
        plotNo: '',
        city: '',
        pincode: '',
        workExperience: '',
        academicHistory: [{ institution: '', degree: '', yearOfPassing: '' }],
        govtProof: null
    });

    // --- Helper Functions ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addAcademic = () => {
        setFormData({
            ...formData,
            academicHistory: [...formData.academicHistory, { institution: '', degree: '', yearOfPassing: '' }]
        });
    };

    const handleAcademicChange = (index, field, value) => {
        const updated = [...formData.academicHistory];
        updated[index][field] = value;
        setFormData({ ...formData, academicHistory: updated });
    };

    const removeAcademic = (index) => {
        if (formData.academicHistory.length > 1) {
            const updated = formData.academicHistory.filter((_, i) => i !== index);
            setFormData({ ...formData, academicHistory: updated });
        }
    };

    // --- Validation Logic ---
    const isStepValid = () => {
        if (step === 1) {
            return formData.firstName && formData.lastName && formData.dob &&
                   formData.gender && formData.phoneNumber && formData.street &&
                   formData.plotNo && formData.city && formData.pincode;
        }
        if (step === 2) {
            return formData.academicHistory.every(edu =>
                edu.institution && edu.degree && edu.yearOfPassing
            );
        }
        if (step === 3) {
            return formData.email && formData.password && formData.email.includes('@');
        }
        if (step === 4) {
            return formData.govtProof !== null;
        }
        return false;
    };

    const handleNext = () => {
        if (isStepValid()) {
            setStep(step + 1);
        } else {
            alert("Please fill in all mandatory fields before proceeding.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        const userBlob = JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            role: formData.role,
            dob: formData.dob,
            gender: formData.gender,
            workExperience: formData.workExperience,
            academicHistory: formData.academicHistory,
            street: formData.street,
            plotNo: formData.plotNo,
            city: formData.city,
            pincode: formData.pincode
        });

        data.append('userData', userBlob);
        if (formData.govtProof) {
            data.append('govtProof', formData.govtProof);
        }

        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                alert("Cafe Owner registration successful! Wait for admin approval.");
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert("Registration failed: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("Could not connect to the server.");
        }
    };

    // --- Styles (Identical to CustomerSignup) ---
    const styles = {
        main: { backgroundColor: '#FDF8F5', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Poppins', sans-serif" },
        formContainer: { maxWidth: '600px', margin: '60px auto', padding: '40px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 15px 35px rgba(75, 44, 32, 0.08)', position: 'relative', border: '1px solid #F0E5DE' },
        title: { color: '#4B2C20', textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' },
        label: { fontSize: '14px', color: '#4B2C20', fontWeight: '600', display: 'block', marginTop: '18px', marginBottom: '5px' },
        input: { width: '100%', padding: '14px 16px', margin: '10px 0', border: '1.5px solid #EEE', borderRadius: '10px', boxSizing: 'border-box', fontSize: '15px', outline: 'none', backgroundColor: '#FAFAFA' },
        tableInput: { width: '100%', padding: '10px', border: '1px solid #E5E5E5', borderRadius: '8px', fontSize: '14px' },
        btn: { padding: '14px 28px', backgroundColor: '#4B2C20', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '25px', fontWeight: '600', fontSize: '16px' },
        secondaryBtn: { padding: '8px 16px', backgroundColor: 'transparent', color: '#A67C52', border: '1.5px solid #A67C52', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginTop: '10px' }
    };

    return (
        <div style={styles.main}>
           
           <div style={styles.logo} onClick={() => navigate('/')}>
            Bookafé
        </div>


            <div style={styles.formContainer}>
                <div style={{textAlign: 'right', cursor: 'pointer', fontSize: '20px', color: '#A67C52'}} onClick={() => navigate('/')}>✖</div>
                
                <h2 style={styles.title}>Cafe Owner Signup - Step {step} of 4</h2>

                {/* STEP 1: PERSONAL & ADDRESS */}
                {step === 1 && (
                    <div>
                        <label style={styles.label}>Personal Information</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input style={styles.input} name="firstName" placeholder="First Name *" onChange={handleChange} value={formData.firstName} />
                            <input style={styles.input} name="lastName" placeholder="Last Name *" onChange={handleChange} value={formData.lastName} />
                        </div>
                        <input style={styles.input} name="dob" type="date" onChange={handleChange} value={formData.dob} />
                        <select style={styles.input} name="gender" onChange={handleChange} value={formData.gender}>
                            <option value="">Select Gender *</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input style={styles.input} name="phoneNumber" type="tel" placeholder="Phone Number *" onChange={handleChange} value={formData.phoneNumber} />
                        
                        <label style={styles.label}>Full Address</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input style={styles.input} name="plotNo" placeholder="Plot / Flat No *" onChange={handleChange} value={formData.plotNo} />
                            <input style={styles.input} name="street" placeholder="Street / Area *" onChange={handleChange} value={formData.street} />
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input style={styles.input} name="city" placeholder="City *" onChange={handleChange} value={formData.city} />
                            <input style={styles.input} name="pincode" placeholder="Pincode *" onChange={handleChange} value={formData.pincode} />
                        </div>
                        <button style={{...styles.btn, width: '100%'}} onClick={handleNext}>Next: Academic Details</button>
                    </div>
                )}

                {/* STEP 2: ACADEMIC & WORK */}
                {step === 2 && (
                    <div>
                        <label style={styles.label}>Academic Information *</label>
                        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                            <thead>
                                <tr style={{textAlign: 'left', fontSize: '13px', color: '#6F4E37'}}>
                                    <th>Institution</th>
                                    <th>Degree</th>
                                    <th>Year</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.academicHistory.map((edu, index) => (
                                    <tr key={index}>
                                        <td><input style={styles.tableInput} placeholder="School/Uni" value={edu.institution} onChange={(e) => handleAcademicChange(index, 'institution', e.target.value)} /></td>
                                        <td><input style={styles.tableInput} placeholder="Degree" value={edu.degree} onChange={(e) => handleAcademicChange(index, 'degree', e.target.value)} /></td>
                                        <td><input style={styles.tableInput} placeholder="Year" value={edu.yearOfPassing} onChange={(e) => handleAcademicChange(index, 'yearOfPassing', e.target.value)} /></td>
                                        <td>{formData.academicHistory.length > 1 && <button onClick={() => removeAcademic(index)} style={{background:'none', border:'none', color:'red', cursor:'pointer'}}>✕</button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button style={styles.secondaryBtn} onClick={addAcademic}>+ Add Entry</button>

                        <label style={{...styles.label, marginTop: '20px'}}>Work Experience (Optional)</label>
                        <textarea style={{...styles.input, height: '80px'}} name="workExperience" placeholder="Past experience in hospitality or business..." onChange={handleChange} value={formData.workExperience} />
                        
                        <div style={{display:'flex', gap:'10px'}}>
                            <button style={{...styles.btn, flex:1, backgroundColor:'#D2B48C'}} onClick={() => setStep(1)}>Back</button>
                            <button style={{...styles.btn, flex:1}} onClick={handleNext}>Next: Account Setup</button>
                        </div>
                    </div>
                )}

                {/* STEP 3: ACCOUNT SETUP */}
                {step === 3 && (
                    <div>
                        <label style={styles.label}>Account Credentials</label>
                        <input style={styles.input} name="email" type="email" placeholder="Email Address *" onChange={handleChange} value={formData.email} />
                        <input style={styles.input} name="password" type="password" placeholder="Create Initial Password *" onChange={handleChange} value={formData.password} />
                        
                        <div style={{display:'flex', gap:'10px'}}>
                            <button style={{...styles.btn, flex:1, backgroundColor:'#D2B48C'}} onClick={() => setStep(2)}>Back</button>
                            <button style={{...styles.btn, flex:1}} onClick={handleNext}>Next: Verification</button>
                        </div>
                    </div>
                )}

                {/* STEP 4: VERIFICATION */}
                {step === 4 && (
                    <div>
                        <label style={styles.label}>Identity Verification *</label>
                        <p style={{fontSize:'13px', color:'#666', marginBottom:'15px'}}>Upload Business License or Owner Identity (Aadhar/PAN).</p>
                        <input style={styles.input} type="file" accept="image/*,.pdf" onChange={(e) => setFormData({...formData, govtProof: e.target.files[0]})} />
                        
                        <div style={{display:'flex', gap:'10px', marginTop: '20px'}}>
                            <button style={{...styles.btn, flex:1, backgroundColor:'#D2B48C'}} onClick={() => setStep(3)}>Back</button>
                            <button style={{...styles.btn, flex:1}} onClick={handleSubmit}>Register & Submit</button>
                        </div>
                    </div>
                )}
            </div>
           
        </div>
    );
};

export default CafeSignup;