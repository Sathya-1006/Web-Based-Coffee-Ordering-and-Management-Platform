import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WaitingRoom from './pages/WaitingRoom';
import AdminDashboard from './pages/AdminDashboard';
import PasswordReset from './pages/PasswordReset';
import CompleteProfile from './pages/CompleteProfile';
import CustomerSignup from './pages/CustomerSignup';
import SetPassword from './pages/SetPassword'; // Added missing import
import CafeSignup from './pages/CafeSignup';     // Added missing import

import Admin from './pages/Admin';
import CustomerProfile from './pages/CustomerProfile';
import CafeOwnerProfile from './pages/CafeOwnerProfile';

// Components
import SignupChoice from './components/SignupChoice'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Registration Flow */}
        <Route path="/signup" element={<SignupChoice />} /> {/* Updated to show choices first */}
        <Route path="/signup-customer" element={<CustomerSignup />} />
        <Route path="/signup-cafe" element={<CafeSignup />} />
        <Route path="/waiting" element={<WaitingRoom />} />
        
        {/* Account Management */}
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-portal" element={<Admin />} />

        {/*Customer Profile*/}
        <Route path="/home" element={<Home />} />
        <Route path="/customer-profile" element={<CustomerProfile />} />
        <Route path="/owner-profile" element={<CafeOwnerProfile />} />
        
      </Routes>
    </Router>
  );
}

export default App;