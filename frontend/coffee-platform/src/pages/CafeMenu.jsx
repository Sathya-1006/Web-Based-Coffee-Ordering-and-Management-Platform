import React, { useEffect, useState } from 'react';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

const CafeMenu = ({ cafe, onBack, onBookTable, addToBag, bag }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyMenuItems = [
  {
    id: 'd1',
    itemName: 'Latte',
    price: 120,
    description: 'Chocolate + milk',
    photo: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=500' 
  },
  {
    id: 'd2',
    itemName: 'Latte choco pie',
    price: 39,
    description: 'A pie with chocolate',
    photo: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500'
  },
  {
    id: 'd3',
    itemName: 'Cappuccino',
    price: 150,
    description: 'Rich espresso with steamed milk foam',
    photo: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500'
  }
];
  // Fetch items added by this specific cafe owner
  useEffect(() => {
  const fetchMenu = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/menu/cafe/${cafe.id}`);
      const data = await response.json();
      
      // If backend returns data, use it; otherwise, use dummy items
      if (data && data.length > 0) {
        setMenuItems(data);
      } else {
        setMenuItems(dummyMenuItems);
      }
    } catch (error) {
      console.error("Fetch error, loading dummy data:", error);
      setMenuItems(dummyMenuItems); // Fallback on network error
    }
  };
  if (cafe?.id) fetchMenu();
}, [cafe]);

  const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#4c3c34', fontWeight: 'bold', background: 'none', border: 'none' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
    card: { backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative' },
    imageContainer: { width: '100%', height: '200px', backgroundColor: '#f0f0f0' },
    itemImage: { width: '100%', height: '100%', objectFit: 'cover' },
    details: { padding: '20px' },
    price: { color: '#a27c5c', fontWeight: 'bold', fontSize: '18px' },
    bookBtn: { backgroundColor: '#4c3c34', color: '#fff', padding: '12px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <button onClick={onBack} style={styles.backBtn}>
            <ChevronLeft size={20} /> Back to Cafes
          </button>
          <h1 style={{ margin: '10px 0 5px 0' }}>{cafe.cafeName} Menu</h1>
          <p style={{ opacity: 0.6, fontSize: '14px' }}>Freshly prepared items just for you.</p>
        </div>
        
        {bag.length > 0 && (
          <button onClick={onBookTable} style={styles.bookBtn}>
            PROCEED TO BOOKING ({bag.length} items)
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading fresh brews...</p>
      ) : (
        <div style={styles.grid}>
          {menuItems.map((item) => {
            const isInBag = bag.some(bagItem => bagItem.id === item.id);
            
            return (
              <div key={item.id} style={styles.card}>
                <div style={styles.imageContainer}>
                  {item.photo ? (
                    <img src={item.photo} alt={item.itemName} style={styles.itemImage} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '40px' }}>☕</div>
                  )}
                </div>
                
                <div style={styles.details}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <h3 style={{ margin: 0, fontSize: '20px' }}>{item.itemName}</h3>
                    <span style={styles.price}>₹{item.price}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#777', marginBottom: '20px', minHeight: '32px' }}>
                    {item.description || "No description available."}
                  </p>
                  
                  <button 
                    onClick={() => addToBag(item)}
                    disabled={isInBag}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isInBag ? '#e6f4ea' : '#4c3c34',
                      color: isInBag ? '#1e7e34' : '#fff',
                      fontWeight: 'bold',
                      cursor: isInBag ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isInBag ? 'ADDED TO BAG' : (
                      <>
                        <ShoppingCart size={18} /> ADD TO BAG
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CafeMenu;