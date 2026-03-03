import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CafeSignup = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Step 1: Personal
        firstName: '', lastName: '', dob: '', gender: '', phoneNumber: '',
        // Step 2: Address
        plotNo: '', area: '', city: '', pincode: '',
        // Step 3: Academic
        institution: '', degree: '', yearOfPassing: '',
        // Step 4: Work Experience
        jobTitle: '', companyName: '', totalYears: '', startDate: '', 
        endDate: '', currentlyWorking: false, responsibilities: '', achievements: '',
        // Step 5: Account & ID
        email: '', password: '', role: 'CafeOwner', govtProof: null
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const isStepValid = () => {
        if (step === 1) {
            return formData.firstName && formData.lastName && formData.dob &&
                   formData.gender && formData.phoneNumber && formData.plotNo && 
                   formData.area && formData.city && formData.pincode;
        }
        if (step === 2) {
            return formData.institution && formData.degree && formData.yearOfPassing;
        }
        if (step === 3) {
            return formData.email && formData.password && formData.email.includes('@');
        }
        if (step === 4) {
            return formData.jobTitle && formData.companyName;
        }
        if (step === 5) {
            return formData.govtProof !== null;
        }
        return false;
    };

    const handleNext = () => {
        if (isStepValid()) setStep(step + 1);
        else alert("Please fill in all mandatory fields.");
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Appending fields to match backend @RequestParam
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('role', formData.role);
        data.append('gender', formData.gender);
        data.append('dob', formData.dob);
        data.append('phone', formData.phoneNumber);
        data.append('plotNo', formData.plotNo);
        data.append('area', formData.area);
        data.append('city', formData.city);
        data.append('pincode', formData.pincode);
        data.append('institution', formData.institution);
        data.append('degree', formData.degree);
        data.append('year', formData.yearOfPassing);
        data.append('jobTitle', formData.jobTitle);
        data.append('companyName', formData.companyName);
        data.append('totalYears', formData.totalYears);
        data.append('startDate', formData.startDate);
        data.append('endDate', formData.endDate || '');
        data.append('currentlyWorking', formData.currentlyWorking);
        data.append('responsibilities', formData.responsibilities || 'N/A');
        data.append('achievements', formData.achievements || 'N/A');
        
        if (formData.govtProof) data.append('govtProof', formData.govtProof);
        
        // Cafe Owners might not need a cafeId during registration, 
        // but adding it if your backend requires it for the 'staff' endpoint
        data.append('cafeId', 0); 

        try {
            // Using the same robust endpoint as the Customer/Staff
            const response = await fetch('http://localhost:8080/users/api/staff/register', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                alert("Cafe Owner registration successful! Wait for admin approval.");
                navigate('/waiting');
            } else {
                alert("Registration failed. Please check backend logs.");
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("Could not connect to server.");
        }
    };

    const styles = {
        main: { 
            backgroundImage: `linear-gradient(rgba(255, 248, 240, 0.9), rgba(255, 248, 240, 0.9)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            padding: '40px 20px'
        },
        formContainer: { 
            maxWidth: '600px', 
            width: '100%',
            padding: '40px', 
            backgroundColor: 'white',
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative'
        },
        cross: {
            position: 'absolute',
            top: '20px',
            right: '25px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B2C20',
            cursor: 'pointer'
        },
        input: { 
            width: '100%', 
            padding: '12px', 
            margin: '8px 0', 
            border: '1px solid #DDD', 
            borderRadius: '8px', 
            boxSizing: 'border-box'
        },
        btn: { 
            padding: '14px', 
            backgroundColor: '#4B2C20', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            marginTop: '20px', 
            width: '100%',
            fontWeight: 'bold'
        }
    };

    return (
        <div style={styles.main}>
            <div style={styles.formContainer}>
                <div style={styles.cross} onClick={() => navigate('/signup-choice')}>✖</div>

                <h2 style={{textAlign: 'center', color: '#4B2C20'}}>Owner Signup - Step {step}</h2>

                {step === 1 && (
                    <div>
                        <input style={styles.input} name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} />
                        <input style={styles.input} name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} />
                        <input style={styles.input} name="dob" type="date" onChange={handleChange} value={formData.dob} />
                        <input style={styles.input} name="phoneNumber" placeholder="Phone" onChange={handleChange} value={formData.phoneNumber} />
                        <input style={styles.input} name="plotNo" placeholder="Plot No" onChange={handleChange} value={formData.plotNo} />
                        <input style={styles.input} name="area" placeholder="Area / Street" onChange={handleChange} value={formData.area} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input style={styles.input} name="city" placeholder="City" onChange={handleChange} value={formData.city} />
                            <input style={styles.input} name="pincode" placeholder="Pincode" onChange={handleChange} value={formData.pincode} />
                        </div>
                        <select style={styles.input} name="gender" onChange={handleChange} value={formData.gender}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <button style={styles.btn} onClick={handleNext}>Next: Education</button>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <input style={styles.input} name="institution" placeholder="University/School" onChange={handleChange} value={formData.institution} />
                        <input style={styles.input} name="degree" placeholder="Degree/Standard" onChange={handleChange} value={formData.degree} />
                        <input style={styles.input} name="yearOfPassing" placeholder="Year of Passing" onChange={handleChange} value={formData.yearOfPassing} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={handleBack}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Account</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                        <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={handleBack}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Experience</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <input style={styles.input} name="jobTitle" placeholder="Previous Job/Business Title" onChange={handleChange} value={formData.jobTitle} />
                        <input style={styles.input} name="companyName" placeholder="Previous Company" onChange={handleChange} value={formData.companyName} />
                        <input style={styles.input} name="totalYears" placeholder="Total Experience" onChange={handleChange} value={formData.totalYears} />
                        {/* Improved Date Row for Step 4 */}
<div style={{ display: 'flex', gap: '15px', margin: '10px 0' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '12px', color: '#666', marginBottom: '4px', fontWeight: '600' }}>Start Date</label>
        <input 
            style={styles.input} 
            name="startDate" 
            type="date" 
            onChange={handleChange} 
            value={formData.startDate} 
        />
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: '12px', color: '#666', marginBottom: '4px', fontWeight: '600' }}>End Date</label>
        <input 
            style={styles.input} 
            name="endDate" 
            type="date" 
            onChange={handleChange} 
            value={formData.endDate} 
            disabled={formData.currentlyWorking} 
        />
    </div>
</div>
                        <div style={{margin: '10px 0'}}>
                            <input type="checkbox" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
                            <label style={{marginLeft: '8px'}}>I currently work here</label>
                        </div>
                        <textarea style={{...styles.input, height: '60px'}} name="responsibilities" placeholder="Experience Summary" onChange={handleChange} value={formData.responsibilities} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={handleBack}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Final Step</button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <p>Upload Business ID or Personal ID</p>
                        <input style={styles.input} type="file" onChange={(e) => setFormData({...formData, govtProof: e.target.files[0]})} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={handleBack}>Back</button>
                            <button style={styles.btn} onClick={handleSubmit}>Complete Registration</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CafeSignup;