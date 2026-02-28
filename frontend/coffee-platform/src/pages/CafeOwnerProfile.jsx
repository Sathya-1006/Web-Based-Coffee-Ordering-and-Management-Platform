import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  LayoutDashboard, 
  Store, 
  PlusCircle,
  FileText, 
  Users, 
  Table as TableIcon, 
  LogOut,
  Coffee,
  ShoppingBag,
  CalendarCheck
} from 'lucide-react';

import { Pencil, Trash2, Plus } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CafeOwnerProfile = () => {
  const navigate = useNavigate();

 // --- STATE ---
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cafeData, setCafeData] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [tables, setTables] = useState([]);

  const [selectedCafe, setSelectedCafe] = useState(null);
  const [myCafes, setMyCafes] = useState([]);
  useEffect(() => {
  if (activeSection === 'my-cafes') {
    fetch('http://localhost:8080/api/cafes/all')
      .then(res => res.json())
      .then(data => setMyCafes(data)) // [cite: 156]
      .catch(err => console.error("Error fetching cafes:", err));
  }
}, [activeSection]);



const [tableForm, setTableForm] = useState({ tableNumber: '', capacity: '', price: '' });

// --- Consolidated Handle Add Table ---
const handleAddTable = async (e) => {
  if (e) e.preventDefault(); // Prevents page reload if called from a form submit

  // Link the table to a specific cafe (assuming the owner has at least one cafe registered)
  const tableData = {
    ...newTable,
    cafeId: myCafes[0]?.id // Dynamically links the table to the owner's cafe
  };

  try {
    const response = await fetch('http://localhost:8080/api/cafes/tables/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tableData)
    });

    if (response.ok) {
      alert("Table added to inventory successfully!");
      // Reset form fields
      setNewTable({ tableNumber: '', capacity: '', price: '', image: null });
      // Close the entry card if you are using a toggle
      if (typeof setShowTableForm === 'function') setShowTableForm(false);
      // Trigger a fetch to refresh the list displayed on the screen
      if (typeof fetchTables === 'function') fetchTables();
    } else {
      const errorMsg = await response.text();
      alert("Failed to add table: " + errorMsg);
    }
  } catch (error) {
    console.error("Error saving table:", error);
    alert("Network error: Could not connect to backend.");
  }
};

// --- 1. Handle Delete ---
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to remove this cafe? This action cannot be undone.")) {
    try {
      const response = await fetch(`http://localhost:8080/api/cafes/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("Cafe removed successfully");
        // Update local state to remove the item from UI immediately
        setMyCafes(prev => prev.filter(cafe => cafe.id !== id));
      } else {
        alert("Failed to delete the cafe.");
      }
    } catch (error) {
      console.error("Error deleting cafe:", error);
    }
  }
};

// --- 2. Handle Edit ---
const handleEdit = (cafe) => {
  setRegForm(cafe);
  setIsEditing(true); // Add this line
  setActiveSection('register');
};

const handleNavigateToRegister = () => {
  setIsEditing(false); // Add this line to ensure a fresh form
  setRegForm({});      
  setActiveSection('register');
};
  
 
  const [isEditing, setIsEditing] = useState(false);

  const [showTableForm, setShowTableForm] = useState(false);
const [newTable, setNewTable] = useState({
    tableNumber: '',
    capacity: '',
    price: '',
    description: '', 
    amenities: '', 
    image: null
});

  // 1. Fetch tables from DB when the section is active
  useEffect(() => {
    if (activeSection === 'tables') {
      fetchTables();
    }
  }, [activeSection]);

  const fetchTables = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/cafes/tables/all');
      const data = await res.json();
      setTables(data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  

  // 3. Handle Remove Table from DB
  const handleRemoveTable = async (id) => {
    if (window.confirm("Remove this table from inventory?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/cafes/tables/delete/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setTables(prev => prev.filter(t => t.id !== id));
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  // --- STAFF MANAGEMENT STATE ---
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [staffForm, setStaffForm] = useState({
    fullName: '', contactNumber: '', email: '', address: '', salary: '', joiningDate: ''
  });

  // --- MENU FORM STATE ---
 const [newItem, setNewItem] = useState({ 
  itemName: '', 
  price: '', 
  category: '', 
  description: '', 
  photo: null 
}); 

  // --- REGISTRATION FORM STATE ---
  const [regForm, setRegForm] = useState({
    cafeName: '', ownerName: '', contactNumber: '', email: '',
    openingTime: '', closingTime: '', street: '', city: '',
    state: '', pincode: '', businessType: 'Proprietorship',
    fssaiLicenseNumber: '', gstNumber: '',
    accountHolderName: '', accountNumber: '', ifscCode: '', upiId: '',
    hasHomeDelivery: false, hasTakeaway: false, hasDineIn: false,
    cafeImage: null,
    cafeLicense: null,
    district: '',
    country: '',
    panNumber: '',
  });

  // --- THEME COLORS ---
  const colors = {
    cream: '#f4eee8',
    latte: '#cbbcb2',
    coffee: '#4c3c34',
    accent: '#a27c5c',
    white: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.6)'
  };

  // --- STYLES OBJECT ---
  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: colors.cream, color: colors.coffee, fontFamily: '"Playfair Display", serif' },
    sidebar: { width: '280px', backgroundColor: colors.latte, height: '100vh', position: 'fixed', left: 0, top: 0, boxShadow: '4px 0 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', zIndex: 100 },
    logoArea: { padding: '40px', borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '24px', fontWeight: 'bold' },
    nav: { marginTop: '20px', flex: 1 },
    main: { marginLeft: '280px', flex: 1, padding: '60px', overflowY: 'auto' },
    card: { backgroundColor: colors.glass, padding: '30px', borderRadius: '24px', border: `1px solid ${colors.white}`, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' },
    input: { padding: '15px', backgroundColor: '#fdfbf9', border: `1px solid ${colors.latte}`, borderRadius: '12px', outline: 'none', width: '100%', boxSizing: 'border-box' },
    buttonPrimary: { backgroundColor: colors.coffee, color: colors.white, padding: '15px 30px', border: 'none', borderRadius: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', width: '100%' },
    headerLabel: { fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', color: colors.accent, marginBottom: '8px' },
    formSection: { marginBottom: '40px', borderBottom: `1px solid ${colors.latte}`, paddingBottom: '20px' },
    checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' },
    menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', marginTop: '40px' },
    menuCard: { backgroundColor: colors.white, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative' },
    itemImage: { width: '100%', height: '180px', objectFit: 'cover' },
    deleteBtn: { position: 'absolute', top: '10px', right: '10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    staffRoleBox: { flex: 1, padding: '40px', backgroundColor: colors.white, borderRadius: '24px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${colors.latte}`, transition: '0.3s' },
    staffCard: { backgroundColor: colors.white, padding: '25px', borderRadius: '20px', borderLeft: `5px solid ${colors.accent}`, boxShadow: '0 5px 15px rgba(0,0,0,0.05)' },
    revokeBtn: { marginTop: '15px', padding: '10px', backgroundColor: '#fff0f0', color: '#cc0000', border: '1px solid #ffcccc', borderRadius: '10px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', width: '100%' },
    // New Table Styles
    tableGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', marginTop: '30px' },
    tableImgPreview: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '10px' }
  };

  // --- TABLE HANDLERS ---
  const handleTableImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewTable({ ...newTable, image: reader.result });
      reader.readAsDataURL(file);
    }
  };


  const fetchCafes = async () => {
    const response = await fetch('http://localhost:8080/api/cafes/all');
    const data = await response.json();
    setCafes(data);
};


  const OrdersManagement = () => (
  <div style={{ padding: '30px' }}>
    <h2 style={{ marginBottom: '20px', color: '#4a3728' }}>Live Orders</h2>
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f0f0f0', fontSize: '12px', color: '#888' }}>
            <th style={{ padding: '15px' }}>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>ITEMS</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Data Row */}
          <tr style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
            <td style={{ padding: '15px', fontWeight: 'bold' }}>#BK-8821</td>
            <td>John Doe</td>
            <td>Cappuccino (x2), Blueberry Muffin</td>
            <td>₹540</td>
            <td><span style={{ backgroundColor: '#fff4e6', color: '#d97706', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>Preparing</span></td>
            <td><button style={{ background: '#6F4E37', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer' }}>Complete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const BookingsManagement = () => (
  <div style={{ padding: '30px' }}>
    <h2 style={{ marginBottom: '20px', color: '#4a3728' }}>Table Reservations</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      {/* Example Booking Card */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Table 01</span>
          <span style={{ color: '#27ae60', fontSize: '12px', fontWeight: 'bold' }}>● CONFIRMED</span>
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <p><strong>Customer:</strong> Sarah Smith</p>
          <p><strong>Guests:</strong> 2 Persons</p>
          <p><strong>Time:</strong> Today, 7:00 PM</p>
        </div>
        <button style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Mark Arrived
        </button>
      </div>
    </div>
  </div>
);
  

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // This converts the image to a long string
            setRegForm(prev => ({
                ...prev,
                [name]: reader.result 
            }));
        };
        reader.readAsDataURL(file);
    }
};
  const handleRegistration = async (e) => {
    e.preventDefault();
    
    // Switch between Register and Update based on isEditing state
    const url = isEditing 
        ? `http://localhost:8080/api/cafes/update/${regForm.id}` 
        : 'http://localhost:8080/api/cafes/register';
        
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regForm)
        });

        if (response.ok) {
            alert(isEditing ? "Cafe Updated Successfully!" : "Business Registered Successfully!");
            setIsEditing(false); // Reset mode
            setActiveSection('my-cafes'); //
        } else {
            const errorData = await response.text();
            alert("Action failed: " + errorData);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the backend server.");
    }
};

  // --- MENU HANDLERS ---
  // --- REFINED MENU HANDLERS ---

  // 1. Fetch menu from DB
  const fetchMenuItems = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/cafes/menu/all');
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // 2. Fetch items when the section becomes active
  useEffect(() => {
    if (activeSection === 'menu') {
      fetchMenuItems();
    }
  }, [activeSection]);

  // 3. Handle Image Upload & Preview
  const handleMenuImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Save to Database
  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/cafes/menu/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        alert("Item added successfully!");
        setNewItem({ itemName: '', price: '', description: '', photo: null });
        fetchMenuItems(); // Refresh the grid
      }
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  // 5. Delete from Database
  const handleDeleteMenu = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/cafes/menu/delete/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMenuItems(prev => prev.filter(item => item.id !== id));
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  // --- STAFF HANDLERS ---
  const handleStaffFormChange = (e) => {
    setStaffForm({ ...staffForm, [e.target.name]: e.target.value });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = { ...staffForm, role: selectedRole, id: Date.now() };
    setStaffList([...staffList, newStaff]);
    setShowStaffForm(false);
    setStaffForm({ fullName: '', contactNumber: '', email: '', address: '', salary: '', joiningDate: '' });
  };

  const handleRevokeStaff = (id) => {
    if(window.confirm("Are you sure you want to revoke this staff's access?")) {
        setStaffList(staffList.filter(s => s.id !== id));
    }
  };

  const SidebarItem = ({ id, label, icon }) => (
    <div 
      onClick={() => { setActiveSection(id); setShowStaffForm(false); setShowTableForm(false); }}
      style={{
        padding: '20px 40px', cursor: 'pointer', transition: '0.3s',
        backgroundColor: activeSection === id ? 'rgba(255,255,255,0.4)' : 'transparent',
        borderLeft: `4px solid ${activeSection === id ? colors.coffee : 'transparent'}`,
        display: 'flex', alignItems: 'center', gap: '15px'
      }}
    >
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <span style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
  <div style={{...styles.logoArea, display: 'flex', alignItems: 'center', gap: '10px'}}>
    <Coffee size={20} color="#6F4E37" /> Bookafé
  </div>
  
  <nav style={styles.nav}>
    <SidebarItem id="dashboard" label="Dashboard" icon={<LayoutDashboard size={18} />} />
    
    {/* Use the component here too for consistency */}
    <SidebarItem id="my-cafes" label="My Cafes" icon={<Store size={18} />} />
    
    <SidebarItem id="register" label="Register Cafe" icon={<PlusCircle size={18} />} />
    <SidebarItem id="menu" label="Menu" icon={<FileText size={18} />} />
    <SidebarItem id="tables" label="Add Tables" icon={<TableIcon size={18} />} />
    <SidebarItem id="staff" label="Staff" icon={<Users size={18} />} />
    <SidebarItem id="orders" label="Orders" icon={<ShoppingBag size={18} />} />
    <SidebarItem id="bookings" label="Table Bookings" icon={<CalendarCheck size={18} />} />
</nav>

  <button 
    onClick={() => navigate('/')} 
    style={{ 
      background: 'none', 
      border: 'none', 
      padding: '40px', 
      fontSize: '10px', 
      fontWeight: 'bold', 
      cursor: 'pointer', 
      opacity: 0.5, 
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
  >
    <LogOut size={14} /> EXIT PORTAL
  </button>
</aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        
        {activeSection === 'dashboard' && (
          <div>
            <div style={styles.headerLabel}>Overview</div>
            <h1 style={{ fontSize: '48px', margin: '0 0 40px 0' }}>Analytics Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
              {[
                { label: 'Total Orders', val: '128', icon: '📦' },
                { label: 'Booked Tables', val: tables.length, icon: '🪑' },
                { label: 'Revenue', val: '₹42,500', icon: '💰' }
              ].map((stat, i) => (
                <div key={i} style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.5 }}>{stat.label}</span>
                    <span style={{ fontSize: '24px' }}>{stat.icon}</span>
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{stat.val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
              <div style={{ ...styles.card, backgroundColor: colors.white }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '12px', textTransform: 'uppercase' }}>Weekly Sales</h4>
                <Bar 
                  data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{ label: 'Orders', data: [12, 19, 15, 22, 30, 45, 38], backgroundColor: colors.coffee, borderRadius: 8 }]
                  }} 
                />
              </div>
              <div style={{ ...styles.card, backgroundColor: colors.white, textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '12px', textTransform: 'uppercase' }}>Occupancy</h4>
                <div style={{ width: '200px', margin: '0 auto' }}>
                  <Pie 
                    data={{
                      labels: ['Booked', 'Free'],
                      datasets: [{ data: [3, 7], backgroundColor: [colors.accent, colors.latte], borderWidth: 0 }]
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'orders' && <OrdersManagement />}
        {activeSection === 'bookings' && <BookingsManagement />}

        {activeSection === 'register' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Cafe Registration</h2>
            <div style={{ ...styles.card, backgroundColor: colors.white, padding: '40px' }}>
              <form onSubmit={handleRegistration}>
                <div style={styles.formSection}>
                  <div style={styles.headerLabel}>Step 01: Basic Information</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <input style={styles.input} required name="cafeName" value={regForm.cafeName} onChange={handleInputChange} placeholder="Cafe Name *" />
                    <input style={styles.input} required name="ownerName" value={regForm.ownerName} onChange={handleInputChange} placeholder="Owner Full Name *" />
                    <input style={styles.input} required name="contactNumber" value={regForm.contactNumber} onChange={handleInputChange} placeholder="Contact Number *" />
                    <input style={styles.input} required type="email" name="email" value={regForm.email} onChange={handleInputChange} placeholder="Email Address *" />
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Opens:</span>
                        <input style={styles.input} required type="time" name="openingTime" value={regForm.openingTime} onChange={handleInputChange} />
                    </div>
                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Closes:</span>
                        <input style={styles.input} required type="time" name="closingTime" value={regForm.closingTime} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div style={styles.formSection}>
                  <div style={styles.headerLabel}>Step 02: Address</div>
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '20px', 
    marginTop: '15px' 
  }}>
    {/* Row 1 */}
    <input 
      style={styles.input} 
      required 
      name="street" 
      value={regForm.street} 
      onChange={handleInputChange} 
      placeholder="Street / Landmark *" 
    />
    <input 
      style={styles.input} 
      required 
      name="district" 
      value={regForm.district} 
      onChange={handleInputChange} 
      placeholder="District / Area *" 
    />

    {/* Row 2 */}
    <input 
      style={styles.input} 
      required 
      name="city" 
      value={regForm.city} 
      onChange={handleInputChange} 
      placeholder="City *" 
    />
    <input 
      style={styles.input} 
      required 
      name="state" 
      value={regForm.state} 
      onChange={handleInputChange} 
      placeholder="State *" 
    />

    {/* Row 3 */}
    <input 
      style={styles.input} 
      required 
      name="pincode" 
      value={regForm.pincode} 
      onChange={handleInputChange} 
      placeholder="Pincode *" 
    />
    <input 
      style={styles.input} 
      required 
      name="country" 
      value={regForm.country} 
      onChange={handleInputChange} 
      placeholder="Country *" 
    />
  </div>
  </div>
 <div style={styles.formSection}>
  <div style={styles.headerLabel}>Step 03: Business Compliance & Media</div>
  
  {/* Row 1 & 2: 4 Evenly spaced text fields */}
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
    <select style={styles.input} name="businessType" value={regForm.businessType} onChange={handleInputChange}>
        <option>Proprietorship</option>
        <option>Partnership</option>
        <option>Private Limited</option>
    </select>
    
    <input style={styles.input} required name="fssaiLicenseNumber" value={regForm.fssaiLicenseNumber} onChange={handleInputChange} placeholder="FSSAI License No *" />
    
    <input style={styles.input} name="gstNumber" value={regForm.gstNumber} onChange={handleInputChange} placeholder="GST Number (Optional)" />
    
    <input style={styles.input} required name="panNumber" value={regForm.panNumber} onChange={handleInputChange} placeholder="PAN Card Number *" />
  </div>

  {/* Bottom Row: File Uploads moved down */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '20px', 
    marginTop: '25px', 
    borderTop: '1px solid #eee', 
    paddingTop: '20px' 
  }}>
    <div>
      <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>CAFE PHOTO</label>
      <input type="file" accept="image/*" name="cafeImage" onChange={handleFileChange} style={{ fontSize: '12px', width: '100%' }} />
      {regForm.cafeImage && <img src={regForm.cafeImage} alt="Cafe Preview" style={{ width: '100px', height: '60px', marginTop: '10px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} />}
    </div>

    <div>
      <label style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>UPLOAD LICENSE (PDF/IMG)</label>
      <input type="file" accept="image/*,.pdf" name="cafeLicense" onChange={handleFileChange} style={{ fontSize: '12px', width: '100%' }} />
      {regForm.cafeLicense && <p style={{ fontSize: '10px', color: '#2ecc71', marginTop: '8px', fontWeight: '600' }}>✓ Document attached</p>}
    </div>
  </div>
</div>
                <div style={styles.formSection}>
                  <div style={styles.headerLabel}>Step 04: Payment & Bank</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                    <input style={styles.input} name="accountHolderName" value={regForm.accountHolderName} onChange={handleInputChange} placeholder="Account Holder Name" />
                    <input style={styles.input} name="accountNumber" value={regForm.accountNumber} onChange={handleInputChange} placeholder="Account Number" />
                    <input style={styles.input} name="ifscCode" value={regForm.ifscCode} onChange={handleInputChange} placeholder="IFSC Code" />
                    <input style={{...styles.input, border: `2px solid ${colors.accent}`}} name="upiId" value={regForm.upiId} onChange={handleInputChange} placeholder="OR UPI ID (e.g. cafe@upi)" />
                  </div>
                </div>
                <div style={styles.formSection}>
                  <div style={styles.headerLabel}>Step 05: Service Features</div>
                  <div style={{ display: 'flex', gap: '30px', marginTop: '15px' }}>
                    <label style={styles.checkboxLabel}><input type="checkbox" name="hasHomeDelivery" checked={regForm.hasHomeDelivery} onChange={handleInputChange} /> Home Delivery</label>
                    <label style={styles.checkboxLabel}><input type="checkbox" name="hasTakeaway" checked={regForm.hasTakeaway} onChange={handleInputChange} /> Takeaway</label>
                    <label style={styles.checkboxLabel}><input type="checkbox" name="hasDineIn" checked={regForm.hasDineIn} onChange={handleInputChange} /> Dine-In</label>
                  </div>
                </div>
               <button type="submit" style={styles.buttonPrimary}>
                {isEditing ? "UPDATE CAFE DETAILS" : "REGISTER BUSINESS"}
              </button>

              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setRegForm({}); setActiveSection('my-cafes'); }}
                  style={{ ...styles.buttonPrimary, backgroundColor: '#7f8c8d', marginTop: '10px' }}
                >
                  CANCEL EDIT
                </button>
)}
              </form>
            </div>
          </div>
        )}

        {activeSection === 'my-cafes' && (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <h2 style={{ fontSize: '32px', margin: 0, color: '#4c3c34', fontFamily: "'Playfair Display', serif" }}>My Registered Cafes</h2>
      
      <button 
        onClick={() => {
          setIsEditing(false); // Reset editing mode
          setRegForm({});      // Clear the form for a new entry
          setActiveSection('register');
        }}
        style={{ 
          ...styles.buttonPrimary, 
          width: 'auto', 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          borderRadius: '8px' 
        }}
      >
        <PlusCircle size={18} /> REGISTER NEW
      </button>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '25px' }}>
      {myCafes.length > 0 ? (
  myCafes.map((cafe) => (
    <div 
      key={cafe.id} 
      style={{ 
        ...styles.card, 
        backgroundColor: '#fff', 
        padding: '24px', 
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        transition: 'all 0.3s ease',
        // Highlights the card if it's the currently selected cafe
        border: selectedCafe?.id === cafe.id ? `2px solid #4c3c34` : '1px solid #eee' 
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '20px' }}>
        
        {/* Cafe Image Container */}
        <div style={{ width: '100px', height: '100px', backgroundColor: '#fdfbf9', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f4eee8', flexShrink: 0 }}>
          {cafe.cafeImage ? (
            <img src={cafe.cafeImage} alt="Cafe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '30px' }}>☕</div>
          )}
        </div>
        
        {/* Text Details */}
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', color: '#4c3c34', fontWeight: 'bold' }}>{cafe.cafeName}</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>{cafe.city}, {cafe.state}</p>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#999' }}>{cafe.contactNumber}</p>
        </div>

        {/* Profile Action Icons (Edit/Delete) */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); handleEdit(cafe); }}
            title="Edit Cafe Details"
            style={{ padding: '8px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            <Pencil size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleDelete(cafe.id); }}
            title="Delete Cafe"
            style={{ padding: '8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* QUICK ACTION MANAGEMENT BAR (Your new Requirement) */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        borderTop: '1px solid #f5f5f5', 
        paddingTop: '16px' 
      }}>
        {/* MANAGE MENU BUTTON */}
        <button 
          onClick={() => {
            setSelectedCafe(cafe); // Logic: Store WHICH cafe we are editing
            setNewItem({ itemName: '', price: '', category: '', description: '', photo: null }); // Logic: Reset form
            setActiveSection('menu'); // Logic: Go to menu section
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            backgroundColor: '#fdfbf9',
            border: '1px solid #eaddd0',
            borderRadius: '10px',
            color: '#4c3c34',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4eee8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfbf9'}
        >
          <Coffee size={18} /> Manage Menu
        </button>

        {/* MANAGE TABLES BUTTON */}
        <button 
          onClick={() => {
            setSelectedCafe(cafe); // Logic: Store WHICH cafe we are editing
            setNewTable({ tableNumber: '', capacity: '', price: '', status: 'Available', image: null }); // Logic: Reset form
            setActiveSection('tables'); // Logic: Go to tables section
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px',
            backgroundColor: '#fdfbf9',
            border: '1px solid #eaddd0',
            borderRadius: '10px',
            color: '#4c3c34',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4eee8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fdfbf9'}
        >
          <TableIcon size={18} /> Manage Tables
        </button>
      </div>
    </div>
  ))
) : (
  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px', backgroundColor: '#fff', borderRadius: '20px', border: '2px dashed #e0e0e0' }}>
    <p style={{ color: '#999', fontSize: '18px', marginBottom: '15px' }}>No cafes registered yet.</p>
    <button 
      onClick={() => setActiveSection('register-cafe')}
      style={{ color: '#4c3c34', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', textDecoration: 'underline' }}
    >
      Start your journey by adding your first cafe
    </button>
  </div>
)}
    </div>
  </div>
)}

        {activeSection === 'menu' && (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    {/* Dynamic Title: Shows which cafe you are managing */}
    <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>
      Manage Menu {selectedCafe ? `for ${selectedCafe.cafeName}` : ''}
    </h2>
    
    <div style={{ ...styles.card, backgroundColor: colors.white }}>
      <form onSubmit={handleAddMenu} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            style={styles.input} 
            required 
            placeholder="Item Name" 
            value={newItem.itemName} 
            onChange={(e) => setNewItem({...newItem, itemName: e.target.value})} 
          />
          
          {/* ADD THIS SELECT BLOCK TO FIX THE ERROR */}
          <select
            style={styles.input}
            required
            name="category"
            // The || "" ensures it's never null, fixing the React error
            value={newItem.category || ""} 
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
          >
            <option value="">Select Category</option>
            <option value="Beverages">Beverages</option>
            <option value="Snacks">Snacks</option>
            <option value="Desserts">Desserts</option>
            <option value="Main Course">Main Course</option>
          </select>

          <input 
            style={styles.input} 
            required 
            type="number" 
            placeholder="Price (₹)" 
            value={newItem.price} 
            onChange={(e) => setNewItem({...newItem, price: e.target.value})} 
          />
          <textarea 
            style={{ ...styles.input, height: '100px', resize: 'none' }} 
            placeholder="Description" 
            value={newItem.description} 
            onChange={(e) => setNewItem({...newItem, description: e.target.value})} 
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <div style={{ width: '100%', height: '150px', border: `2px dashed ${colors.latte}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {newItem.photo ? <img src={newItem.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ opacity: 0.5 }}>Image Preview</span>}
          </div>
          <input type="file" accept="image/*" onChange={handleMenuImage} style={{ fontSize: '12px' }} />
          <button type="submit" style={styles.buttonPrimary}>Save to Menu</button>
        </div>
      </form>
    </div>

    <div style={styles.menuGrid}>
      {menuItems.map((item) => (
        <div key={item.id} style={styles.menuCard}>
          {/* Delete button calls handleDeleteMenu (API DELETE) */}
          <button onClick={() => handleDeleteMenu(item.id)} style={styles.deleteBtn}>✕</button>
          {item.photo && <img src={item.photo} alt={item.itemName} style={styles.itemImage} />}
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{item.itemName}</h3>
              <span style={{ fontWeight: 'bold', color: colors.accent }}>₹{item.price}</span>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.7, margin: 0 }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        {activeSection === 'staff' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>Staff Management</h2>
            {!showStaffForm ? (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={styles.staffRoleBox} onClick={() => { setSelectedRole('Chef'); setShowStaffForm(true); }}>
                        <div style={{ fontSize: '40px' }}>👨‍🍳</div>
                        <h4 style={{ letterSpacing: '2px' }}>CHEF</h4>
                    </div>
                    <div style={styles.staffRoleBox} onClick={() => { setSelectedRole('Waiter'); setShowStaffForm(true); }}>
                        <div style={{ fontSize: '40px' }}>🤵</div>
                        <h4 style={{ letterSpacing: '2px' }}>WAITER</h4>
                    </div>
                </div>
            ) : (
                <div style={{ ...styles.card, backgroundColor: colors.white }}>
                    <h3 style={{ marginBottom: '20px', textTransform: 'uppercase', fontSize: '14px' }}>Onboarding {selectedRole}</h3>
                    <form onSubmit={handleAddStaff} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <input style={styles.input} required name="fullName" placeholder="Full Name" onChange={handleStaffFormChange} />
                        <input style={styles.input} required name="contactNumber" placeholder="Contact Number" onChange={handleStaffFormChange} />
                        <input style={styles.input} required name="email" type="email" placeholder="Email" onChange={handleStaffFormChange} />
                        <input style={styles.input} required name="salary" placeholder="Salary (₹)" onChange={handleStaffFormChange} />
                        <input style={{ ...styles.input, gridColumn: 'span 2' }} required name="address" placeholder="Residential Address" onChange={handleStaffFormChange} />
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '10px', fontWeight: 'bold' }}>JOINING DATE</label>
                            <input style={styles.input} required name="joiningDate" type="date" onChange={handleStaffFormChange} />
                        </div>
                        <button type="submit" style={styles.buttonPrimary}>Add {selectedRole}</button>
                        <button type="button" onClick={() => setShowStaffForm(false)} style={{ background: 'none', border: 'none', color: colors.accent, fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
                {staffList.map((staff) => (
                    <div key={staff.id} style={styles.staffCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ margin: 0, fontSize: '18px' }}>{staff.fullName}</h3>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: colors.latte, padding: '4px 8px', borderRadius: '4px' }}>{staff.role}</span>
                        </div>
                        <div style={{ fontSize: '13px', marginTop: '10px', opacity: 0.8 }}>
                            <p style={{ margin: '4px 0' }}>📞 {staff.contactNumber}</p>
                            <p style={{ margin: '4px 0' }}>✉️ {staff.email}</p>
                            <p style={{ margin: '4px 0' }}>💰 Salary: ₹{staff.salary}</p>
                            <p style={{ margin: '4px 0' }}>📅 Joined: {staff.joiningDate}</p>
                        </div>
                        <button onClick={() => handleRevokeStaff(staff.id)} style={styles.revokeBtn}>REVOKE ACCESS</button>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* INTEGRATED TABLE MANAGEMENT SECTION */}
      {activeSection === 'tables' && (
  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      {/* Icon Heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ backgroundColor: '#4c3c34', padding: '10px', borderRadius: '12px', display: 'flex' }}>
          <TableIcon size={28} color="#fff" />
        </div>
        <h2 style={{ fontSize: '32px', margin: 0, color: '#4c3c34' }}>Inventory</h2>
      </div>

      {!showTableForm && (
        <button onClick={() => setShowTableForm(true)} style={{ ...styles.buttonPrimary, width: 'auto' }}>
          + Add New Table
        </button>
      )}
    </div>

    {showTableForm && (
      <div style={{ ...styles.card, backgroundColor: colors.white, marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>New Table Details</h3>
        
        <form onSubmit={handleAddTable}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <input 
              style={styles.input} required type="number" placeholder="Table Number" 
              value={newTable.tableNumber} 
              onChange={(e) => setNewTable({...newTable, tableNumber: e.target.value})} 
            />
            <input 
              style={styles.input} required type="number" placeholder="Capacity (Persons)" 
              value={newTable.capacity} 
              onChange={(e) => setNewTable({...newTable, capacity: e.target.value})} 
            />
            <input 
              style={styles.input} required type="number" placeholder="Price Per Hour (₹)" 
              value={newTable.price} 
              onChange={(e) => setNewTable({...newTable, price: e.target.value})} 
            />
            
            {/* New Description Field */}
            <textarea 
              style={{ ...styles.input, gridColumn: 'span 3', height: '80px', resize: 'none' }}
              placeholder="Table Description (e.g., Window side, Quiet corner...)"
              value={newTable.description}
              onChange={(e) => setNewTable({...newTable, description: e.target.value})}
            />

            {/* New Amenities Field */}
            <input 
              style={{ ...styles.input, gridColumn: 'span 3' }}
              placeholder="Amenities (e.g., Power Socket, AC, Near WiFi - separate with commas)"
              value={newTable.amenities}
              onChange={(e) => setNewTable({...newTable, amenities: e.target.value})}
            />
            
            <div style={{ gridColumn: 'span 3', padding: '20px', border: `2px dashed ${colors.latte}`, borderRadius: '12px', textAlign: 'center', backgroundColor: '#fdfbf9' }}>
              {newTable.image && (
                <div style={{ marginBottom: '15px' }}>
                  <img src={newTable.image} alt="Preview" style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px' }} />
                </div>
              )}
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '10px', color: colors.accent, fontWeight: 'bold' }}>UPLOAD TABLE IMAGE</label>
              <input type="file" accept="image/*" onChange={handleTableImage} style={{ fontSize: '12px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '25px', alignItems: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#4c3c34', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
              ADD TABLE
            </button>
            <button 
              type="button" 
              onClick={() => {
                setShowTableForm(false);
                setNewTable({ tableNumber: '', capacity: '', price: '', description: '', amenities: '', image: null });
              }} 
              style={{ background: 'none', border: `1px solid ${colors.latte}`, color: colors.coffee, padding: '11px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}

    <div style={styles.tableGrid}>
      {tables.length === 0 ? (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', opacity: 0.5 }}>
          No tables in inventory. Click "+ Add New Table" to start.
        </div>
      ) : (
        tables.map((table) => (
          <div key={table.id} style={{ ...styles.menuCard, position: 'relative' }}>
            {table.image ? (
              <img src={table.image} alt={`Table ${table.tableNumber}`} style={styles.itemImage} />
            ) : (
              <div style={{ ...styles.itemImage, backgroundColor: colors.latte, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '40px' }}>🪑</span>
              </div>
            )}
            
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: colors.coffee }}>Table {table.tableNumber}</h3>
                <span style={{ fontWeight: 'bold', color: colors.accent }}>₹{table.price}/hr</span>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.7, margin: '10px 0' }}>Capacity: {table.capacity} Persons</p>
              
              {/* Display Description */}
              {table.description && (
                <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic', marginBottom: '10px' }}>
                  {table.description}
                </p>
              )}

              {/* Display Amenities as Tags */}
              {table.amenities && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
                  {table.amenities.split(',').map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '10px', backgroundColor: '#f0f0f0', padding: '4px 8px', borderRadius: '4px', color: '#4c3c34' }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button 
                  onClick={() => { setNewTable(table); setShowTableForm(true); }}
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#f39c12', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleRemoveTable(table.id)} 
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#e74c3c', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default CafeOwnerProfile;