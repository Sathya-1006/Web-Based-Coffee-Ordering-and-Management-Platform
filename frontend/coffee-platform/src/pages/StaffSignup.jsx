import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, ChevronLeft, CheckCircle, Briefcase } from 'lucide-react';

const StaffSignUp = ({ onBack, cafeId, role }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal & Account
    firstName: '', lastName: '', dob: '', gender: '', email: '', phone: '', password: '', role: role || 'Chef',
    // Step 2: Address
    plotNo: '', area: '', city: '', pincode: '',
    // Step 3: Academic
    institution: '', degree: '', year: '', govtProof: null,
    // Step 4: Work Experience
    jobTitle: '', companyName: '', employmentType: 'Full-time', 
    startDate: '', endDate: '', currentlyWorking: false,
    workCity: '', workState: '', responsibilities: '', achievements: '', totalYears: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, govtProof: e.target.files[0] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  // 1. Properly append all text fields
  Object.keys(formData).forEach((key) => {
    // Skip the file field here, we handle it separately
    if (key !== 'govtProof') {
      data.append(key, formData[key]);
    }
  });

  // 2. Append the file explicitly
  if (formData.govtProof) {
    data.append('govtProof', formData.govtProof);
  }

  // 3. Fix the cafeId - ensure it is NOT 'undefined'
  // If cafeId is missing, use a fallback or alert the user
  if (!cafeId) {
    console.error("Critical Error: cafeId is missing from props!");
    return alert("System Error: Cafe ID not found. Please reload the page.");
  }
  data.append('cafeId', cafeId);

  try {
    const response = await fetch('http://localhost:8080/api/staff/register', {
      method: 'POST',
      body: data, // Note: Do NOT set Content-Type header when sending FormData
    });

    if (response.ok) {
      alert("Staff Registered Successfully!");
      onBack();
    } else {
      const errorText = await response.text();
      console.error("Server Error:", errorText);
      alert("Registration Failed: " + errorText);
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Check backend connection.");
  }
};

  const styles = {
    container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' },
    stepper: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', position: 'relative' },
    stepLine: { position: 'absolute', top: '17px', left: 0, right: 0, height: '2px', backgroundColor: '#E8DED5', zIndex: 1 },
    stepCircle: (active) => ({
      width: '35px', height: '35px', borderRadius: '50%', 
      backgroundColor: active ? '#4B2C20' : '#E8DED5',
      color: active ? '#FFF' : '#4B2C20',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 'bold', zIndex: 2, transition: '0.3s'
    }),
    card: { backgroundColor: '#fff', padding: '35px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eee' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
    label: { fontSize: '11px', fontWeight: 'bold', color: '#8C7E74', marginBottom: '5px', display: 'block', textTransform: 'uppercase' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #D6CADD', outline: 'none', width: '100%', boxSizing: 'border-box', fontSize: '14px' },
    textarea: { padding: '12px', borderRadius: '8px', border: '1px solid #D6CADD', width: '100%', minHeight: '80px', boxSizing: 'border-box', fontFamily: 'inherit' },
    btnNext: { backgroundColor: '#4B2C20', color: '#FFF', padding: '12px 25px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' },
    btnPrev: { background: 'none', border: '1px solid #4B2C20', color: '#4B2C20', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft color="#4B2C20" /></button>
        <h2 style={{ color: '#4B2C20', margin: 0 }}>Onboarding {formData.role}</h2>
      </div>

      <div style={styles.stepper}>
        <div style={styles.stepLine}></div>
        {[1, 2, 3, 4].map(s => <div key={s} style={styles.stepCircle(step >= s)}>{s}</div>)}
      </div>

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Personal */}
          {step === 1 && (
            <div>
              <h3 style={{ marginTop: 0, color: '#4B2C20' }}>Personal Details</h3>
              <div style={styles.grid}>
                <div><label style={styles.label}>First Name</label><input style={styles.input} name="firstName" onChange={handleChange} required /></div>
                <div><label style={styles.label}>Last Name</label><input style={styles.input} name="lastName" onChange={handleChange} required /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>Email</label><input type="email" style={styles.input} name="email" onChange={handleChange} required /></div>
                <div><label style={styles.label}>Phone</label><input style={styles.input} name="phone" onChange={handleChange} required /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>Gender</label>
                   <select name="gender" style={styles.input} onChange={handleChange} required>
                     <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option>
                   </select>
                </div>
                <div><label style={styles.label}>DOB</label><input type="date" style={styles.input} name="dob" onChange={handleChange} required /></div>
              </div>
              <div><label style={styles.label}>Temporary Password</label><input type="password" style={styles.input} name="password" onChange={handleChange} required /></div>
            </div>
          )}

          {/* STEP 2: Address */}
          {step === 2 && (
            <div>
              <h3 style={{ marginTop: 0, color: '#4B2C20' }}>Address Details</h3>
              <div style={styles.grid}>
                <div><label style={styles.label}>Plot No</label><input style={styles.input} name="plotNo" onChange={handleChange} required /></div>
                <div><label style={styles.label}>Area</label><input style={styles.input} name="area" onChange={handleChange} required /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>City</label><input style={styles.input} name="city" onChange={handleChange} required /></div>
                <div><label style={styles.label}>Pincode</label><input style={styles.input} name="pincode" onChange={handleChange} required /></div>
              </div>
            </div>
          )}

          {/* STEP 3: Academic */}
          {step === 3 && (
            <div>
              <h3 style={{ marginTop: 0, color: '#4B2C20' }}>Academic Background</h3>
              <div style={styles.grid}>
                <div style={{gridColumn: 'span 2'}}><label style={styles.label}>Institution Name</label><input style={styles.input} name="institution" onChange={handleChange} required /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>Degree</label><input style={styles.input} name="degree" onChange={handleChange} required /></div>
                <div><label style={styles.label}>Year of Passing</label><input style={styles.input} name="year" onChange={handleChange} required /></div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <label style={styles.label}>Govt ID Proof (PDF/JPG)</label>
                <input type="file" style={styles.input} onChange={handleFileChange} required />
              </div>
            </div>
          )}

          {/* STEP 4: Work Experience */}
          {step === 4 && (
            <div>
              <h3 style={{ marginTop: 0, color: '#4B2C20', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={20}/> Work Experience
              </h3>
              <div style={styles.grid}>
                <div><label style={styles.label}>Job Title</label><input style={styles.input} name="jobTitle" placeholder="e.g. Senior Chef" onChange={handleChange} /></div>
                <div><label style={styles.label}>Company Name</label><input style={styles.input} name="companyName" onChange={handleChange} /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>Employment Type</label>
                  <select name="employmentType" style={styles.input} onChange={handleChange}>
                    <option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option>
                  </select>
                </div>
                <div><label style={styles.label}>Total Years of Experience</label><input style={styles.input} name="totalYears" placeholder="e.g. 3.5" onChange={handleChange} /></div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>Start Date</label><input type="date" style={styles.input} name="startDate" onChange={handleChange} /></div>
                <div>
                  <label style={styles.label}>End Date</label>
                  <input type="date" style={styles.input} name="endDate" onChange={handleChange} disabled={formData.currentlyWorking} />
                  <div style={{marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <input type="checkbox" name="currentlyWorking" onChange={handleChange} /> <span style={{fontSize: '12px'}}>I currently work here</span>
                  </div>
                </div>
              </div>
              <div style={styles.grid}>
                <div><label style={styles.label}>City</label><input style={styles.input} name="workCity" onChange={handleChange} /></div>
                <div><label style={styles.label}>State</label><input style={styles.input} name="workState" onChange={handleChange} /></div>
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={styles.label}>Responsibilities</label>
                <textarea style={styles.textarea} name="responsibilities" placeholder="Key tasks you performed..." onChange={handleChange}></textarea>
              </div>
              <div>
                <label style={styles.label}>Achievements</label>
                <textarea style={styles.textarea} name="achievements" placeholder="Notable awards or accomplishments..." onChange={handleChange}></textarea>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
  {step > 1 && (
    <button 
      type="button" // Important: Keeps it from submitting
      onClick={prevStep} 
      style={styles.btnPrev}
    >
      <ChevronLeft size={18}/> Back
    </button>
  )}
  
  {step < 4 ? ( 
    <button 
      type="button" 
      onClick={(e) => {
        e.preventDefault(); 
        nextStep();
      }} 
      style={styles.btnNext}
    >
      Next Step <ChevronRight size={18}/>
    </button>
  ) : (
    <button 
      type="submit"
      style={{ ...styles.btnNext, backgroundColor: '#27ae60' }}
    >
      <CheckCircle size={18}/> Complete Registration
    </button>
  )}
</div>
        </form>
      </div>
    </div>
  );
};

export default StaffSignUp;