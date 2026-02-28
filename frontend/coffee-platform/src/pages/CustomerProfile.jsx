import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CafeMenu from '../components/CafeMenu';
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  User as UserIcon, 
  LogOut, 
  Coffee,
  ChevronRight,
  Clock
} from 'lucide-react';

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [view, setView] = useState('cafe-list');
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [bag, setBag] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUserData, setEditUserData] = useState({});

  const [selectedOrderType, setSelectedOrderType] = useState('Dine-In (Book a Table)');
  const [selectedTable, setSelectedTable] = useState('');

  const calculateTotal = () => bag.reduce((sum, item) => sum + Number(item.price), 0);

  // --- INITIAL LOAD ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditUserData(parsedUser);
      fetchCafes();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // --- FETCH TABLES ---
  useEffect(() => {
    const fetchTables = async () => {
      if (view === 'booking' && selectedCafe?.id) {
        try {
          const response = await fetch(`http://localhost:8080/api/cafes/tables/${selectedCafe.id}`);
          const data = await response.json();
          setAvailableTables(data);
        } catch (error) {
          console.error("Error fetching tables:", error);
        }
      }
    };
    fetchTables();
  }, [view, selectedCafe]);

  const fetchCafes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cafes/all');
      const data = await response.json();
      setCafes(data);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/customer/${user.id}`);
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const addToBag = (item) => {
    setBag(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
  };

  const handleConfirmOrder = async () => {
    if (bag.length === 0) {
      alert("Your bag is empty!");
      return;
    }
    const orderData = {
      customerId: user.id,
      customerName: `${user.firstName} ${user.lastName}`,
      cafeId: selectedCafe.id,
      cafeName: selectedCafe.cafeName,
      totalAmount: calculateTotal(),
      orderType: selectedOrderType,
      tableNumber: selectedOrderType.includes("Dine-In") ? selectedTable : "N/A",
      items: bag.map(item => item.itemName)
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (response.ok) {
        alert("Order Placed Successfully!");
        setBag([]);
        setSelectedTable('');
        setView('orders');
        fetchOrderHistory();
      }
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  if (!user) return null;

  // --- STYLES ---
  const colors = {
    coffee: '#4c3c34',
    latte: '#cbbcb2',
    cream: '#fdfbf9',
    white: '#ffffff',
    accent: '#a27c5c'
  };

  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8f5f2' },
    sidebar: { width: '280px', backgroundColor: colors.latte, color: colors.coffee, display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' },
    sidebarHeader: { padding: '40px 30px', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: '15px', padding: '18px 30px', cursor: 'pointer',
      backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent',
      transition: '0.3s', borderLeft: active ? `4px solid ${colors.latte}` : '4px solid transparent'
    }),
    mainContent: { flex: 1, marginLeft: '280px', padding: '40px 60px' },
    card: { backgroundColor: colors.white, borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' },
    actionBtn: { backgroundColor: colors.coffee, color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }
  };

  return (
    <div style={styles.container}>
      {/* --- SIDEBAR --- */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>☕ Bookafé</div>
        <nav style={{ flex: 1, marginTop: '20px' }}>
          <div style={styles.navItem(view === 'cafe-list' || view === 'menu')} onClick={() => setView('cafe-list')}>
            <Store size={20} /> Cafes
          </div>
          <div style={styles.navItem(view === 'orders')} onClick={() => { setView('orders'); fetchOrderHistory(); }}>
            <ShoppingBag size={20} /> My Orders
          </div>
          <div style={styles.navItem(view === 'personal')} onClick={() => setView('personal')}>
            <UserIcon size={20} /> Profile
          </div>
        </nav>
        <div style={{ ...styles.navItem(false), marginTop: 'auto', marginBottom: '20px' }} onClick={() => { localStorage.removeItem('user'); navigate('/'); }}>
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.mainContent}>
        
        {/* VIEW 1: CAFE LIST */}
        {view === 'cafe-list' && (
          <>
            <h1 style={{ marginBottom: '10px' }}>Welcome, {user.firstName}</h1>
            <p style={{ color: '#666', marginBottom: '40px' }}>Select a cafe to browse the menu and book a table.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
              {cafes.map(cafe => (
                <div key={cafe.id} style={styles.card}>
                   <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#eee' }}>
                     {cafe.cafeImage ? <img src={cafe.cafeImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>☕</div>}
                   </div>
                   <h3 style={{ margin: '0 0 8px 0' }}>{cafe.cafeName}</h3>
                   <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>{cafe.city}, {cafe.state}</p>
                   <button 
                    onClick={() => { setSelectedCafe(cafe); setView('menu'); }}
                    style={{ ...styles.actionBtn, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                   >
                     Browse Menu <ChevronRight size={16} />
                   </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 2: MENU */}
        {view === 'menu' && (
  <CafeMenu
    cafe={selectedCafe}
    onBack={() => setView('cafe-list')}
    onBookTable={() => setView('booking')}
    addToBag={addToBag}
    bag={bag}
  />
)}

        {/* VIEW 3: BOOKING */}
        {view === 'booking' && (
          <div style={{ maxWidth: '700px' }}>
            <button onClick={() => setView('menu')} style={{ background: 'none', border: 'none', color: colors.coffee, cursor: 'pointer', marginBottom: '20px' }}>← Back to Menu</button>
            <h1 style={{ marginBottom: '30px' }}>Complete Your Booking</h1>
            <div style={styles.card}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>ORDER TYPE</label>
              <select style={styles.input} value={selectedOrderType} onChange={(e) => setSelectedOrderType(e.target.value)}>
                <option value="Dine-In (Book a Table)">Dine-In (Book a Table)</option>
                <option value="Takeaway">Takeaway</option>
                <option value="Home Delivery">Home Delivery</option>
              </select>

              {selectedOrderType.includes("Dine-In") && (
                <>
                  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', marginTop: '10px' }}>SELECT TABLE</label>
                  <select style={styles.input} value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                    <option value="">Choose a table...</option>
                    {availableTables.map((t) => (
                      <option key={t.id} value={`Table ${t.tableNumber}`}>
                        Table {t.tableNumber} ({t.capacity} Seater) - ₹{t.price}/hr
                      </option>
                    ))}
                  </select>
                </>
              )}

              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: colors.cream, borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 15px 0' }}>Order Summary</h4>
                {bag.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{item.itemName}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #ddd', marginTop: '15px', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <button onClick={handleConfirmOrder} style={{ ...styles.actionBtn, width: '100%', marginTop: '30px', padding: '15px' }}>
                PLACE ORDER
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: ORDER HISTORY */}
        {view === 'orders' && (
          <>
            <h1 style={{ marginBottom: '30px' }}>Order History</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {orderHistory.map(order => (
                <div key={order.id} style={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{order.cafeName}</h4>
                      <p style={{ fontSize: '12px', color: '#999' }}>{new Date(order.orderDate).toLocaleString()}</p>
                    </div>
                    <span style={{ backgroundColor: '#e6f4ea', color: '#1e7e34', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{order.status}</span>
                  </div>
                  <div style={{ marginTop: '15px', fontSize: '14px' }}>
                    <strong>Items:</strong> {order.items.join(', ')}
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '20px', fontSize: '13px', opacity: 0.8 }}>
                    <span>Type: {order.orderType}</span>
                    {order.tableNumber !== "N/A" && <span>Table: {order.tableNumber}</span>}
                    <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>₹{order.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 5: PROFILE */}
        {view === 'personal' && (
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ marginBottom: '30px' }}>Profile Settings</h1>
            <div style={styles.card}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>First Name</label>
              <input 
                disabled={!isEditingProfile} 
                style={{...styles.input, backgroundColor: !isEditingProfile ? '#f9f9f9' : '#fff'}} 
                value={editUserData.firstName} 
                onChange={(e) => setEditUserData({...editUserData, firstName: e.target.value})} 
              />
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Last Name</label>
              <input 
                disabled={!isEditingProfile} 
                style={{...styles.input, backgroundColor: !isEditingProfile ? '#f9f9f9' : '#fff'}} 
                value={editUserData.lastName} 
                onChange={(e) => setEditUserData({...editUserData, lastName: e.target.value})} 
              />
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Email</label>
              <input 
                disabled={!isEditingProfile} 
                style={{...styles.input, backgroundColor: !isEditingProfile ? '#f9f9f9' : '#fff'}} 
                value={editUserData.email} 
                onChange={(e) => setEditUserData({...editUserData, email: e.target.value})} 
              />
              
              {!isEditingProfile ? (
                <button onClick={() => setIsEditingProfile(true)} style={styles.actionBtn}>Edit Profile</button>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setUser(editUserData); localStorage.setItem('user', JSON.stringify(editUserData)); setIsEditingProfile(false); }} style={{...styles.actionBtn, backgroundColor: '#2ecc71'}}>Save</button>
                  <button onClick={() => setIsEditingProfile(false)} style={{...styles.actionBtn, backgroundColor: '#777'}}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default CustomerProfile;