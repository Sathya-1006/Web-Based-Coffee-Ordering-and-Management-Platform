import React from 'react';

const CafeMenu = ({ cafe, bagItems = [], addToBag, onBack, setView }) => {
  // Use the menu from the cafe object provided by the owner
  const menuItems = cafe?.menu || []; 

  const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' },
    card: { backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },
    btn: (isInBag) => ({
      width: '100%', padding: '12px', borderRadius: '10px', border: 'none',
      backgroundColor: isInBag ? '#8b735b' : '#4c3c34', color: '#fff', cursor: 'pointer', fontWeight: 'bold'
    })
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#a27c5c', fontWeight: 'bold', cursor: 'pointer' }}>← BACK</button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>{cafe?.name}</h1>
        <p style={{color: '#a27c5c'}}>{cafe?.location} • {cafe?.description || 'Welcome to our artisan space.'}</p>
      </div>

      <div style={styles.grid}>
        {menuItems.length > 0 ? (
          menuItems.map(item => {
            const isInBag = bagItems.some(i => i.id === item.id);
            return (
              <div key={item.id} style={styles.card}>
                <img src={item.image || 'https://via.placeholder.com/300x200?text=Coffee'} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <p style={{ fontWeight: 'bold' }}>₹{item.price}</p>
                  <button style={styles.btn(isInBag)} onClick={() => addToBag(item)}>
                    {isInBag ? '✓ Added' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>This cafe hasn't uploaded a menu yet.</p>
        )}
      </div>
    </div>
  );
};

export default CafeMenu;