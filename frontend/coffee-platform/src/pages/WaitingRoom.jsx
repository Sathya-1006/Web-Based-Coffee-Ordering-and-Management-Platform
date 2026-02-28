
const WaitingRoom = () => {
  return (

    
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFF8F0' }}>
      
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '60px' }}>⏳</div>
        <h2 style={{ color: '#4B2C20' }}>Registration Submitted!</h2>
        <p style={{ maxWidth: '500px', color: '#6F4E37', lineHeight: '1.6' }}>
          Thank you for joining <strong>Bookafé</strong>. Your details and Government Proof are currently being verified by our Admin team. 
          <br /><br />
          Once approved, you will receive a <strong>Password Reset Link</strong> via email to activate your account.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          style={{ marginTop: '20px', padding: '10px 25px', backgroundColor: '#A67B5B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Return Home
        </button>
      </div>
      
    </div>
  );
};

export default WaitingRoom;