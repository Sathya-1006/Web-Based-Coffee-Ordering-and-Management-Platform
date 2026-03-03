import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerSignup = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        dob: '', 
        gender: '', 
        phoneNumber: '',
        email: '', 
        role: 'Customer',
        password: '',
        plotNo: '',
        area: '', 
        city: '',
        pincode: '',
        institution: '', 
        degree: '',
        yearOfPassing: '',
        // --- Added Work Experience Fields ---
        jobTitle: '', 
        companyName: '',
        totalYears: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        responsibilities: '',
        achievements: 'N/A',
        // ------------------------------------
        govtProof: null
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
            // Step 4 is Work Experience - keeping it optional but checking mandatory fields if they started typing
            return formData.jobTitle && formData.companyName;
        }
        if (step === 5) {
            return formData.govtProof !== null;
        }
        return false;
    };

    const handleNext = () => {
        if (isStepValid()) {
            setStep(step + 1);
        } else {
            alert("Please fill in all mandatory fields.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Step 1: Personal
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('role', formData.role);
        data.append('gender', formData.gender);
        data.append('dob', formData.dob);
        data.append('phone', formData.phoneNumber);

        // Step 2: Address
        data.append('plotNo', formData.plotNo);
        data.append('area', formData.area);
        data.append('city', formData.city);
        data.append('pincode', formData.pincode);

        // Step 3: Academic
        data.append('institution', formData.institution);
        data.append('degree', formData.degree);
        data.append('year', formData.yearOfPassing);
        data.append('govtProof', formData.govtProof);

        // Step 4: Work (Now using dynamic values)
        data.append('jobTitle', formData.jobTitle);
        data.append('companyName', formData.companyName);
        data.append('totalYears', formData.totalYears);
        data.append('startDate', formData.startDate);
        data.append('endDate', formData.endDate || '');
        data.append('currentlyWorking', formData.currentlyWorking);
        data.append('responsibilities', formData.responsibilities || 'N/A');
        data.append('achievements', formData.achievements);

        data.append('cafeId', 1); 

        try {
            const response = await fetch('http://localhost:8080/users/api/staff/register', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                alert("Registration successful! Wait for admin approval.");
                navigate('/waiting');
            } else {
                alert("Registration failed. Check if your backend is running.");
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("Could not connect to server.");
        }
    };

    const styles = {
        main: { 
            backgroundImage: `linear-gradient(rgba(255, 248, 240, 0.85), rgba(255, 248, 240, 0.85)), url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            padding: '40px 20px',
            position: 'relative'
        },
        formContainer: { 
            maxWidth: '600px', 
            width: '100%',
            padding: '40px', 
            backgroundColor: 'white',
            borderRadius: '20px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative' // For absolute cross symbol
        },
        cross: {
            position: 'absolute',
            top: '20px',
            right: '25px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B2C20',
            cursor: 'pointer',
            transition: '0.3s'
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
                {/* Cross Symbol to navigate back */}
                <div style={styles.cross} onClick={() => navigate('/signup')}>✖</div>

                <h2 style={{textAlign: 'center', color: '#4B2C20'}}>Customer Signup - Step {step}</h2>

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
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={() => setStep(1)}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Account</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                        <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={() => setStep(2)}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Work Experience</button>
                        </div>
                    </div>
                )}

                {/* NEW STEP 4: WORK EXPERIENCE */}
                {step === 4 && (
                    <div>
                        <input style={styles.input} name="jobTitle" placeholder="Job Title" onChange={handleChange} value={formData.jobTitle} />
                        <input style={styles.input} name="companyName" placeholder="Company Name" onChange={handleChange} value={formData.companyName} />
                        <input style={styles.input} name="totalYears" placeholder="Total Experience (Years)" onChange={handleChange} value={formData.totalYears} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input style={styles.input} name="startDate" type="date" placeholder="Start Date" onChange={handleChange} value={formData.startDate} />
                            <input style={styles.input} name="endDate" type="date" placeholder="End Date" onChange={handleChange} value={formData.endDate} disabled={formData.currentlyWorking} />
                        </div>
                        <div style={{margin: '10px 0'}}>
                            <input type="checkbox" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} />
                            <label style={{marginLeft: '8px'}}>I currently work here</label>
                        </div>
                        <textarea style={{...styles.input, height: '60px'}} name="responsibilities" placeholder="Key Responsibilities" onChange={handleChange} value={formData.responsibilities} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={() => setStep(3)}>Back</button>
                            <button style={styles.btn} onClick={handleNext}>Next: Verification</button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <p>Upload Government ID (Aadhar/PAN)</p>
                        <input style={styles.input} type="file" onChange={(e) => setFormData({...formData, govtProof: e.target.files[0]})} />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.btn, backgroundColor: '#888'}} onClick={() => setStep(4)}>Back</button>
                            <button style={styles.btn} onClick={handleSubmit}>Complete Registration</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerSignup;