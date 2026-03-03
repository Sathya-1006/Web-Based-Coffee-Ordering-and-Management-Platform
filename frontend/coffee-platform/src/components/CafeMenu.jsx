import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Plus, Check } from 'lucide-react';

const CafeMenu = ({ cafe, onBack, onBookTable, addToBag, bag }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/menu/cafe/${cafe.id}`);
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    if (cafe?.id) fetchMenu();
  }, [cafe.id]);

  const colors = { coffee: '#4c3c34', accent: '#d4a373', white: '#ffffff' };

  return (
    <div style={{ padding: '20px' }}>
      {/* Back Header */}
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', color: colors.coffee, fontWeight: 'bold', marginBottom: '20px' }}>
        <ArrowLeft size={20} /> Back to Cafes
      </button>
      
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: colors.coffee, margin: 0 }}>{cafe?.cafeName}</h1>
        <p style={{ color: '#888' }}>{cafe?.city}, {cafe?.state} • Browse our selection</p>
      </div>

      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: '#888' }}>This cafe hasn't uploaded a menu yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {menuItems.map(item => {
            const isInBag = bag.some(bagItem => bagItem.id === item.id);
            return (
              <div key={item.id} style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <img 
                  src={item.photo || 'https://via.placeholder.com/300x200?text=No+Image'} 
                  alt={item.itemName} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '20px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: colors.coffee }}>{item.itemName}</h4>
                  <p style={{ fontSize: '14px', color: '#777', height: '40px', overflow: 'hidden', marginBottom: '15px' }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '18px', color: colors.coffee }}>₹{item.price}</span>
                    <button 
                      onClick={() => addToBag(item)}
                      style={{ 
                        backgroundColor: isInBag ? '#8b735b' : colors.coffee, 
                        color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.3s' 
                      }}
                    >
                      {isInBag ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Checkout Button */}
      {bag.length > 0 && (
        <button 
          onClick={onBookTable}
          style={{ 
            position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: colors.accent, color: 'white', border: 'none', 
            padding: '18px 40px', borderRadius: '50px', display: 'flex', 
            alignItems: 'center', gap: '12px', boxShadow: '0 8px 25px rgba(212, 163, 115, 0.4)', 
            cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', zIndex: 1000
          }}
        >
          <ShoppingBag size={22} /> Proceed to Table Booking ({bag.length} items)
        </button>
      )}
    </div>
  );
};

export default CafeMenu;