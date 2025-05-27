import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Welcome to the Student Project Portal</h1>
        <p style={{ marginBottom: '30px', fontSize: '1.1rem', fontWeight: '300' }}>
          Choose your role to get started
        </p>
        <div>
          <button
            onClick={() => navigate('/student/upload')}
            style={{
              padding: '12px 30px',
              marginRight: '20px',
              fontSize: '16px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#4CAF50',
              color: 'white',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#45a049'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CAF50'}
          >
            Student Upload
          </button>
          <button
            onClick={() => navigate('/faculty/login')}
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0b7dda'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2196F3'}
          >
            Faculty Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
